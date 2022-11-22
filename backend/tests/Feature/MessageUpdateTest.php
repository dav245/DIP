<?php

namespace Tests\Feature;

use App\Models\Message;
use App\Models\User;
use Tests\TestCase;

class MessageUpdateTest extends TestCase
{
    protected User $user;
    protected User $other;
    protected Message $message;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        $this->other = User::factory()->create();
        $this->message = Message::factory()->create(['user_id' => $this->user->id]);
    }

    public function test_user_can_update_message_that_has_not_been_sent()
    {
        $response = $this->actingAs($this->user)->postJson(route('message.update', [
            'message' => $this->message->id,
            'subject' => 'subject',
            'content' => 'content',
            'recipients' => [$this->other->id],
        ]));

        $response->assertStatus(200);

        $this->assertDatabaseHas('messages', [
            'id' => $this->message->id,
            'subject' => 'subject',
            'content' => 'content',
            'sent' => false
        ]);

        $this->assertDatabaseHas('message_user', [
            'message_id' => $this->message->id,
            'user_id' => $this->other->id,
        ]);
    }

    public function test_user_can_not_update_message_that_has_been_sent()
    {
        $this->message->update(['sent' => true]);

        $response = $this->actingAs($this->user)->postJson(route('message.update', [
            'message' => $this->message->id,
            'subject' => 'subject',
            'content' => 'content',
            'recipients' => [$this->other->id],
        ]));

        $response->assertStatus(403);
    }

    public function test_not_logged_in_user_cannot_update_message()
    {
        $response = $this->postJson(route('message.update', [
            'message' => $this->message->id,
            'subject' => 'subject',
            'content' => 'content',
            'recipients' => [$this->other->id],
        ]));

        $response->assertStatus(401);
    }
}
