<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\UploadImageRequest;
use App\Http\Requests\UserRequest;
use App\Mail\UserRegistered;
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
        dd($user);
        Mail::to($user)->queue(new UserRegistered($user));
        return response($user, 201);
    }
    public function getAuthUser(Request $request)
    {
        $user = User::with('favorites')->where('id', $request->user()->id)->first();
        return $user;
    }
    public function update(Request $request, User $user, ImageService $imageService)
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
            $user->update(['img_path' => $filePath ]);

        } else {
            $imageFile = $request->image;
            if(!is_null($imageFile) && $imageFile->isValid()){
                $filePath = $imageService->uploadImage($imageFile, $folderName);
            }
            $user->update(['img_path' => $filePath ]);
        }






        return $user;
    }
}
