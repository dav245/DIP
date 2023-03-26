<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Message;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $password = Hash::make('test');
        User::factory()->create(['nickname' => 'test', 'password' => $password]);
        User::factory()->count(20)->create(['password' => $password])->each(function (User $user) {
            Message::factory()->count(5)->create(['user_id' => $user->id]);
        });
    }
}
