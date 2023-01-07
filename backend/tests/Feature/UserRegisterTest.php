<?php

namespace Tests\Feature;

use App\Models\User;
use App\Rules\DeviceRule;
use Tests\TestCase;

class UserRegisterTest extends TestCase
{
    protected User $user;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->make();
    }
    public function test_user_can_register()
    {
        $response = $this->postJson(route('auth.register', [
            'nickname' => $this->user->nickname,
            'password' => 'test_password',
            'device_name' => DeviceRule::VALID_DEVICES[0],
        ]));

        $response->assertStatus(200);
    }

    public function test_user_can_register_and_then_login()
    {
        $this->postJson(route('auth.register', [
            'nickname' => $this->user->nickname,
            'password' => 'test_password',
            'device_name' => DeviceRule::VALID_DEVICES[0],
        ]));

        $response = $this->postJson(route('auth.login', [
            'nickname' => $this->user->nickname,
            'password' => 'test_password',
            'device_name' => DeviceRule::VALID_DEVICES[0],
        ]));

        $response->assertStatus(200);
    }
}
