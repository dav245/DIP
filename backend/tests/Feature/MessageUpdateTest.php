<?php

namespace Tests\Feature;

use App\Enums\MessageType;
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
        $this->message = Message::factory()->create([
            'owner_id' => $this->user->id,
            'type' => MessageType::DRAFT()
        ]);
    }

    public function test_user_can_update_message_that_has_not_been_sent()
    {
        $response = $this->actingAs($this->user)->postJson(route('message.update', [
            'message' => $this->message->id,
        ]), [
            'subject' => 'subject',
            'content' => 'content',
            'recipients' => [$this->other->id],
        ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('messages', [
            'id' => $this->message->id,
            'subject' => 'subject',
            'content' => 'content',
            'type' => MessageType::DRAFT()
        ]);

        $this->assertDatabaseHas('message_user', [
            'message_id' => $this->message->id,
            'user_id' => $this->other->id,
        ]);
    }

    public function test_user_can_update_message_that_has_not_been_sent_and_send_it()
    {
        $response = $this->actingAs($this->user)->postJson(route('message.update', [
            'message' => $this->message->id,
        ]), [
            'subject' => 'subject',
            'content' => 'content',
            'recipients' => [$this->other->id],
            'send' => true
        ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('messages', [
            'id' => $this->message->id,
            'subject' => 'subject',
            'content' => 'content',
            'type' => MessageType::SENT()
        ]);

        $this->assertDatabaseHas('message_user', [
            'message_id' => $this->message->id,
            'user_id' => $this->other->id,
        ]);
    }

    public function test_user_can_not_update_message_that_has_been_sent()
    {
        $this->message->update(['type' => MessageType::SENT()]);

        $response = $this->actingAs($this->user)->postJson(route('message.update', [
            'message' => $this->message->id,
        ]), [
            'subject' => 'subject',
            'content' => 'content',
            'recipients' => [$this->other->id],
        ]);

        $response->assertStatus(403);
    }

    public function test_user_can_not_update_message_of_other_user()
    {
        $response = $this->actingAs($this->other)->postJson(route('message.update', [
            'message' => $this->message->id,
        ]), [
            'subject' => 'subject',
            'content' => 'content',
            'recipients' => [$this->other->id],
        ]);

        $response->assertStatus(403);
    }

    public function test_not_logged_in_user_cannot_update_message()
    {
        $response = $this->postJson(route('message.update', [
            'message' => $this->message->id,
        ]), [
            'subject' => 'subject',
            'content' => 'content',
            'recipients' => [$this->other->id],
        ]);

        $response->assertStatus(401);
    }
}
