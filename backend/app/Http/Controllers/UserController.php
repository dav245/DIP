<?php

namespace App\Http\Controllers;

use App\Models\User;

class UserController extends Controller
{
    public function self(): User
    {
        return User::logged();
    }

    public function recipients(): array
    {
        $items =  User::query()
            ->select(['nickname as label', 'id as value'])
            ->get();

        return ['items' => $items];
    }
}
