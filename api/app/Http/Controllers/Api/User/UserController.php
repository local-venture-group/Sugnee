<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Mail\UserRegistered;
use App\Models\CorporationApplicant;
use App\Models\CorporationApplicantschedule;
use App\Models\CorporationJoboffer;
use App\Models\Favorite;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Services\ImageService;
use App\Services\UserService;

class UserController extends Controller
{
    public function login(Request $request, UserService $userService)
    {

        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
        if (auth()->guard('users')->attempt($credentials)) {


            $request->session()->regenerate();
            $user = User::findOrFail(Auth::guard('users')->id());
            $withUser = $user->with('frikuApplicant.frikuApplicantSchedules')->first();

            $favoritesJobs = $userService->getOmFavorited($user);
            $favoritesJobs += $userService->getFrikuFavorited($withUser);
            $applied = [];
            $applied = $userService->getOmApplied($user);
            $applied += $userService->getFrikuApplied($withUser);

            $user->favorites = $favoritesJobs;
            $user->appliedJobs = $applied;
            return response()->json([
                'user' =>  $user,
                'message' => "ログインに成功しました"
            ]);
        }

        return response()->json([
            'message' => 'ログイン失敗しました'
        ], 401);
    }

    public function logout(Request $request)
    {

        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(true);
    }
    public function register(UserRequest $request, User $user)
    {
        $user = User::create([
            'name' => $request->lastName . ' ' . $request->firstName,
            'first_name' => $request->firstName,
            'last_name' => $request->lastName,
            'birth' => $request->birth,
            'first_name_kana' => $request->firstNameKana,
            'last_name_kana' => $request->lastNameKana,
            'gender' => $request->gender,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        Mail::to($user)->queue(new UserRegistered($user));
        return response($user, 201);
    }
    public function getAuthUser(Request $request)
    {
        //① OM求人のお気に入りを取得
        // $user = User::findOrFail(Auth::guard('users')->id())->first();
        $user = User::with('frikuApplicant.frikuApplicantSchedules')->findOrFail(Auth::guard('users')->id());

        // $withUser = $user->with('frikuApplicant.frikuApplicantSchedules')->first();

        $omfavorites = Favorite::where('user_id', $user->id)->get();

        $favoritesOmBaseJobs = CorporationJoboffer::whereIn('id', $omfavorites->pluck('corporation_joboffer_id'))->get();
        $favoritesJobs = ['om' => $favoritesOmBaseJobs];

        //② OM求人の応募済みを取得
        $applicantWithApplied = CorporationApplicantschedule::with('corporationJoboffer')
            ->where('applicant_id', $user->id)
            ->get();
        $applied = [];
        if (!empty($applicantWithApplied)) {
            $applied['om'] = $applicantWithApplied->map(function ($schedule) {

                return $schedule->corporationJoboffer;
            });
        }
        //③ Fリク求人のお気に入りを取得
        $favoritesFrikuBaseJobs = $user->frikuFavorites;
        $favoritesJobs += ['friku' => $favoritesFrikuBaseJobs];

        // $user->favorites = $favoritesJobs;
        //④ Fリク求人の応募済みを取得
        $applied['friku'] = [];
        if($user->frikuApplicant){
            $frikuApplicant = $user->frikuApplicant;
            $applied['friku'] = collect($frikuApplicant->frikuApplicantSchedules)->map(function ($schedule, $key) {
                return $schedule->frikuJoboffer;
            });
        }

        // $user->appliedJobs = $applied;
        $editedUser = User::findOrFail(Auth::guard('users')->id());
        $editedUser->favorites = $favoritesJobs;
        $editedUser->appliedJobs = $applied;
        //toJsonでエンコード
        return $editedUser->toJson(JSON_UNESCAPED_UNICODE);
    }
    public function update(UserUpdateRequest $request, User $user, ImageService $imageService)
    {

        $filePath = $user->img_path;
        $folderName = 'users';
        if ($request->has('imageBase64')) {
            $request->validate([
                'image' => 'nullable|string',
            ]);

            $imageFile = $request->imageBase64;

            if (!is_null($imageFile)) {
                $filePath = $imageService->uploadBase64Image($imageFile, $folderName);
            }
            // $user->update(['img_path' => $filePath ]);

        } else {
            $imageFile = $request->image;
            if (!is_null($imageFile) && $imageFile->isValid()) {
                $filePath = $imageService->uploadImage($imageFile, $folderName);
            }
            // $user->update(['img_path' => $filePath ]);
        }

        if (app()->environment('local')) {
            $filePath = config('app.aws_access_bucket') . '.s3.' . config('app.aws_default_region') . '.amazonaws.com' . $filePath;
        }
        $user->fill($request->validated() +  ['img_path' => $filePath])->save();

        return $user;
    }
}
