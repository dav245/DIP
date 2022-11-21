<?php

namespace Tests\Feature;

use App\Models\User;
use App\Rules\DeviceRule;
use Tests\TestCase;

class UserLoginTest extends TestCase
{
    protected User $user;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
    }

    public function test_user_can_login_with_correct_password()
    {
        $response = $this->postJson(route('auth.login', [
            'nickname' => $this->user->nickname,
            'password' => 'test',
            'device_name' => DeviceRule::VALID_DEVICES[0],
        ]));

        $response->assertStatus(200);
    }

    public function test_user_can_not_login_with_incorrect_password()
    {
        $response = $this->postJson(route('auth.login', [
            'nickname' => $this->user->nickname,
            'password' => 'wrong_test',
            'device_name' => DeviceRule::VALID_DEVICES[0],
        ]));

        $response->assertStatus(422);
    }
}
