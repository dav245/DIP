<?php

namespace Tests\Unit;

use App\Models\User;
use Tests\TestCase;

class AuthorizationTest extends TestCase
{
    protected User $user;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
    }

    public function test_request_with_access_token_is_authorized()
    {
        $token = $this->user->createToken('token');

        $response = $this->getJson(route('user.self'), [
            'Authorization' => "Bearer {$token->plainTextToken}"
        ]);

        $response->assertStatus(200);
    }

    public function test_request_without_access_token_is_not_authorized()
    {
        $response = $this->getJson(route('user.self'), [
            'Authorization' => "Bearer"
        ]);

        $response->assertStatus(401);
    }
}
