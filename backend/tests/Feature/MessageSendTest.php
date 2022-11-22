<?php

namespace Tests\Feature;

use App\Models\Message;
use App\Models\User;
use Tests\TestCase;

class MessageSendTest extends TestCase
{
    protected User $user;
    protected Message $message;
    protected Message $otherMessage;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        $this->message = Message::factory()->create(['user_id' => $this->user->id]);
        $this->otherMessage = Message::factory()->create();
    }

    public function test_user_can_send_own_message()
    {
        $response = $this->actingAs($this->user)->postJson(route('message.send', [
            'message' => $this->message->id,
        ]));

        $response->assertStatus(200);

        $this->assertDatabaseHas('messages', [
            'id' => $this->message->id,
            'sent' => true
        ]);
    }

    public function test_user_can_send_message_to_multiple_recipient()
    {
        $response = $this->actingAs($this->user)->postJson(route('message.send', [
            'message' => $this->otherMessage->id,
        ]));

        $response->assertStatus(403);
    }

    public function test_not_logged_in_user_cannot_send_message()
    {
        $response = $this->postJson(route('message.send', [
            'message' => $this->message->id,
        ]));

        $response->assertStatus(401);
    }
}
