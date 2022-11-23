<?php

namespace Tests\Feature;

use App\Enums\MessageType;
use App\Models\Message;
use App\Models\User;
use Tests\TestCase;

class MessageDraftsTest extends TestCase
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
            'owner_id' => $this->user->id,
            'sent_from_id' => $this->other->id,
            'type' => MessageType::RECEIVED()
        ]);
        $this->messageDraft = Message::factory()->create([
            'owner_id' => $this->user->id,
            'type' => MessageType::DRAFT()
        ]);
        $this->messageSent = Message::factory()->create([
            'owner_id' => $this->user->id,
            'type' => MessageType::SENT()
        ]);
        $this->otherMessage = Message::factory()->create([
            'owner_id' => $this->other->id,
            'sent_from_id' => $this->user->id,
            'type' => MessageType::SENT()
        ]);
    }

    public function test_user_can_get_drafts_messages()
    {
        $response = $this->actingAs($this->user)->getJson(route('message.drafts'));

        $response->assertStatus(200);

        $response->assertJsonPath('total', 1);
        $response->assertJsonPath('data.0.id', $this->messageDraft->id);
    }

    public function test_not_logged_in_user_cannot_get_drafts_messages()
    {
        $response = $this->getJson(route('message.drafts'));

        $response->assertStatus(401);
    }
}
