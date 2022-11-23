<?php

namespace Tests\Feature;

use App\Enums\MessageType;
use App\Models\Message;
use App\Models\User;
use Tests\TestCase;

class MessageSendTest extends TestCase
{
    protected User $user;
    protected User $otherUser;
    protected Message $message;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        $this->otherUser = User::factory()->create();
        $this->message = Message::factory()->create([
            'owner_id' => $this->user->id,
            'type' => MessageType::DRAFT()
        ]);
        $this->message->recipients()->sync([$this->otherUser->id]);
    }

    public function test_user_can_send_own_message()
    {
        $response = $this->actingAs($this->user)->postJson(route('message.send', [
            'message' => $this->message->id,
        ]));

        $response->assertStatus(200);

        $this->assertDatabaseHas('messages', [
            'id' => $this->message->id,
            'type' => MessageType::SENT()
        ]);

        $this->assertDatabaseHas('messages', [
            'type' => MessageType::RECEIVED(),
            'owner_id' => $this->otherUser->id,
            'sent_from_id' => $this->user->id
        ]);
    }

    public function test_not_logged_in_user_cannot_send_message()
    {
        $response = $this->postJson(route('message.send', [
            'message' => $this->message->id,
        ]));

        $response->assertStatus(401);
    }
}
