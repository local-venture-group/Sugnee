<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Mail\UserRegistered;
use App\Models\CorporationApplicant;
use App\Models\CorporationApplicantschedule;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Services\ImageService;

class UserController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
        if (auth()->guard('users')->attempt($credentials)) {
            $request->session()->regenerate();
            $userId = Auth::guard('users')->id();
            $user = User::with('favorites')->where('id', $userId)->first();

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
            'firstName' => $request->firstName,
            'lastName' => $request->lastName,
            'birth' => $request->birth,
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
        //TODO : favoritesテーブルと紐付いている求人テーブルを取得する
        $user = User::with('favorites')->where('id', Auth::guard('users')->id())->first();

        //② OM求人の応募済みを取得
        $appliantWithApplied = CorporationApplicantschedule::with('corporationJoboffer')
            ->where('applicant_id', $user->id)
            ->first();
        if(!empty($appliantWithApplied)){
            $appliedJobs = $appliantWithApplied->corporationJoboffer;
            if(!empty($appliedJobs)){
                $user->appliedJobs = collect($appliedJobs);
            }
        }
        //③ Fリク求人のお気に入りを取得

        //④ Fリク求人の応募済みを取得

        //toJsonでエンコード
        return $user->toJson(JSON_UNESCAPED_UNICODE);
    }
    public function update(UserUpdateRequest $request, User $user, ImageService $imageService)
    {


        $folderName = 'users';
        if($request->has('imageBase64')){
            $request->validate([
                'image' => 'nullable|string',
            ]);

            $imageFile = $request->imageBase64;

            if(!is_null($imageFile)){
                $filePath = $imageService->uploadBase64Image($imageFile, $folderName);
            }
            // $user->update(['img_path' => $filePath ]);

        } else {
            $imageFile = $request->image;
            if(!is_null($imageFile) && $imageFile->isValid()){
                $filePath = $imageService->uploadImage($imageFile, $folderName);
            }
            // $user->update(['img_path' => $filePath ]);
        }

        $user->fill($request->validated() +  ['img_path' => $filePath])->save();






        return $user;
    }
}
