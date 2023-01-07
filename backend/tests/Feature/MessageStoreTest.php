<?php

namespace Tests\Feature;

use App\Enums\MessageType;
use App\Models\User;
use Tests\TestCase;

class MessageStoreTest extends TestCase
{
    protected User $user;
    protected User $other1;
    protected User $other2;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        $this->other1 = User::factory()->create();
        $this->other2 = User::factory()->create();
    }

    public function test_user_can_send_message_to_single_recipient()
    {
        $response = $this->actingAs($this->user)->putJson(route('message.store', [
            'subject' => 'subject',
            'content' => 'content',
            'recipients' => [$this->other1->id],
        ]));

        $response->assertStatus(201);

        $this->assertDatabaseHas('messages', [
            'id' => $response->json('id'),
            'type' => MessageType::DRAFT()
        ]);

        $this->assertDatabaseHas('message_contents', [
            'id' => $response->json('message_content_id'),
            'subject' => 'subject',
            'content' => 'content',
            'user_id' => $this->user->id
        ]);

        $this->assertDatabaseHas('message_content_user', [
            'message_content_id' => $response->json('message_content_id'),
            'user_id' => $this->other1->id,
        ]);

        $this->user->sentMessages->contains('id', $response->json('id'));
    }

    public function test_user_can_send_message_to_single_recipient_and_send_right_away()
    {
        $response = $this->actingAs($this->user)->putJson(route('message.store', [
            'subject' => 'subject',
            'content' => 'content',
            'recipients' => [$this->other1->id],
            'send' => '1'
        ]));

        $response->assertStatus(201);

        $this->assertDatabaseHas('messages', [
            'id' => $response->json('id'),
            'type' => MessageType::SENT()
        ]);

        $this->assertDatabaseHas('message_contents', [
            'id' => $response->json('message_content_id'),
            'subject' => 'subject',
            'content' => 'content',
            'user_id' => $this->user->id
        ]);

        $this->assertDatabaseHas('message_content_user', [
            'message_content_id' => $response->json('message_content_id'),
            'user_id' => $this->other1->id,
        ]);
    }

    public function test_user_can_send_message_to_multiple_recipient()
    {
        $response = $this->actingAs($this->user)->putJson(route('message.store', [
            'subject' => 'subject',
            'content' => 'content',
            'recipients' => [$this->other1->id, $this->other2->id],
        ]));

        $response->assertStatus(201);

        $this->assertDatabaseHas('messages', [
            'id' => $response->json('id'),
            'type' => MessageType::DRAFT()
        ]);

        $this->assertDatabaseHas('message_contents', [
            'id' => $response->json('message_content_id'),
            'subject' => 'subject',
            'content' => 'content',
            'user_id' => $this->user->id
        ]);

        $this->assertDatabaseHas('message_content_user', [
            'message_content_id' => $response->json('message_content_id'),
            'user_id' => $this->other1->id,
        ]);
        $this->assertDatabaseHas('message_content_user', [
            'message_content_id' => $response->json('message_content_id'),
            'user_id' => $this->other2->id,
        ]);
    }

    public function test_not_logged_in_user_cannot_send_message()
    {
        $response = $this->putJson(route('message.store', [
            'subject' => 'subject',
            'content' => 'content',
            'recipients' => [$this->other1->id],
        ]));

        $response->assertStatus(401);
    }
}
