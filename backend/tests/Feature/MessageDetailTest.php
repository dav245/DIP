<?php

namespace Tests\Feature;

use App\Enums\MessageType;
use App\Models\Message;
use App\Models\User;
use Tests\TestCase;

class MessageDetailTest extends TestCase
{
    protected User $user;
    protected User $other;
    protected Message $message;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        $this->other = User::factory()->create();
        $this->message = Message::factory()->create([
            'user_id' => $this->user->id,
            'type' => MessageType::DRAFT()
        ]);
    }

    public function test_user_can_view_own_message()
    {
        $response = $this->actingAs($this->user)->getJson(route('message.message', [
            'message' => $this->message->id,
        ]));

        $response->assertStatus(200);

        $response->assertJsonPath('message.id', $this->message->id);
    }

    public function test_user_can_view_others_message()
    {
        $this->message->update(['type' => MessageType::SENT()]);

        $response = $this->actingAs($this->other)->getJson(route('message.message', [
            'message' => $this->message->id,
        ]));

        $response->assertStatus(403);
    }

    public function test_not_logged_in_user_cannot_view_any_message()
    {
        $response = $this->getJson(route('message.message', [
            'message' => $this->message->id,
        ]));

        $response->assertStatus(401);
    }
}
