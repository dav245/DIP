<?php

namespace Tests\Feature;

use App\Enums\MessageType;
use App\Models\Message;
use App\Models\MessageContent;
use App\Models\User;
use Tests\TestCase;

class MessageSentTest extends TestCase
{
    protected User $user;
    protected User $other;
    protected Message $messageReceived;
    protected Message $messageDraft;
    protected Message $messageSent;
    protected Message $otherMessage;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        $this->other = User::factory()->create();
        $this->messageReceived = Message::factory()->create([
            'user_id' => $this->user->id,
            'message_content_id' => MessageContent::factory()->state(['user_id' =>  $this->other->id]),
            'type' => MessageType::RECEIVED()
        ]);
        $this->messageDraft = Message::factory()->create([
            'user_id' => $this->user->id,
            'type' => MessageType::DRAFT()
        ]);
        $this->messageSent = Message::factory()->create([
            'user_id' => $this->user->id,
            'type' => MessageType::SENT()
        ]);
        $this->otherMessage = Message::factory()->create([
            'user_id' => $this->other->id,
            'message_content_id' => MessageContent::factory()->state(['user_id' =>  $this->other->id]),
            'type' => MessageType::SENT()
        ]);
    }

    public function test_user_can_get_sent_messages()
    {
        $response = $this->actingAs($this->user)->getJson(route('message.sent'));

        $response->assertStatus(200);

        $this->assertCount(1, $response->json('messages'));

        $response->assertJsonPath('messages.0.id', $this->messageSent->id);
    }

    public function test_not_logged_in_user_cannot_get_sent_messages()
    {
        $response = $this->getJson(route('message.sent'));

        $response->assertStatus(401);
    }
}
