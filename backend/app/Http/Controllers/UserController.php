<?php

namespace App\Http\Controllers;

use App\Models\User;

class UserController extends Controller
{
    public function self(): User
    {
        return User::logged();
    }
}
