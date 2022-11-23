<?php

namespace Tests\Feature;

use App\Enums\MessageType;
use App\Models\Message;
use App\Models\User;
use Tests\TestCase;

class MessageDeleteTest extends TestCase
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
            'owner_id' => $this->user->id,
            'type' => MessageType::DRAFT()
        ]);
    }

    public function test_user_can_delete_message_that_has_not_been_sent()
    {
        $response = $this->actingAs($this->user)->deleteJson(route('message.delete', [
            'message' => $this->message->id,
        ]));

        $response->assertStatus(200);

        $this->assertDatabaseMissing('messages', [
            'id' => $this->message->id,
        ]);
    }

    public function test_user_can_not_delete_message_that_has_been_sent()
    {
        $this->message->update(['type' => MessageType::SENT()]);

        $response = $this->actingAs($this->user)->deleteJson(route('message.delete', [
            'message' => $this->message->id,
        ]));

        $response->assertStatus(403);
    }

    public function test_user_can_not_delete_message_of_other_user()
    {
        $response = $this->actingAs($this->other)->deleteJson(route('message.delete', [
            'message' => $this->message->id,
        ]));

        $response->assertStatus(403);
    }

    public function test_not_logged_in_user_cannot_delete_message()
    {
        $response = $this->deleteJson(route('message.delete', [
            'message' => $this->message->id,
        ]));

        $response->assertStatus(401);
    }
}
