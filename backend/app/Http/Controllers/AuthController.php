<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $user = User::findByNickname($request->nickname);

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'nickname' => ['The provided credentials are incorrect.'],
            ]);
        }

        return ['token' => $user->createToken($request->device_name)->plainTextToken];
    }

    public function register(RegisterRequest $request)
    {
        $user = User::create(array_merge($request->validated(), [
            'password' => Hash::make($request->password)
        ]));

        return ['token' => $user->createToken($request->device_name)->plainTextToken];
    }
}
