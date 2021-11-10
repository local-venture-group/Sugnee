<?php

namespace App\Http\Controllers\Api\Staff;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Staff;

class StaffController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);



        if (Auth::guard('staffs')->attempt($credentials)) {
            $request->session()->regenerate();

            return response()->json([
                'admin' =>  auth()->guard('staffs')->user(),
                'message' => "スタッフログインに成功しました"
             ]);

         }
         return response()->json([
            'message' => 'スタッフログイン失敗しました'
        ], 401);


    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(true);
    }
    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:191',
            'email' => 'required|string|max:191|unique:staffs,email',
            'password' => 'required|string'
        ]);

        $user = Staff::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password'])
        ]);

        $token = $user->createToken('foundProjectToken')->plainTextToken;

        // ユーザー登録テスト用
        // return response($user, 201);


        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }
    public function index()
    {
        $user = Staff::orderBy('id', 'desc')->get();
        return response()->json($user, 200);
    }
}
