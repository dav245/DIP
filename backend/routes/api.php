<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\RouteController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::controller(UserController::class)
        ->prefix('/user/')
        ->name('user.')
        ->group(function () {
            Route::get('self', 'self')->name('self');
        });
});

Route::controller(AuthController::class)
    ->prefix('/auth/')
    ->name('auth.')
    ->group(function () {
        Route::post('login', 'login')->name('login');
        Route::post('register', 'register')->name('register');
    });

Route::controller(RouteController::class)
    ->prefix('/route/')
    ->name('route.')
    ->group(function () {
        Route::get('routes', 'routes')->name('routes');
    });
