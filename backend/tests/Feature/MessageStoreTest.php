<?php

namespace Tests\Feature;

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
            'subject' => 'subject',
            'content' => 'content',
            'sent' => false
        ]);

        $this->assertDatabaseHas('message_user', [
            'message_id' => $response->json('id'),
            'user_id' => $this->other1->id,
        ]);
    }

    public function test_user_can_send_message_to_single_recipient_and_send_right_away()
    {
        $response = $this->actingAs($this->user)->putJson(route('message.store', [
            'subject' => 'subject',
            'content' => 'content',
            'recipients' => [$this->other1->id],
            'sent' => '1'
        ]));

        $response->assertStatus(201);

        $this->assertDatabaseHas('messages', [
            'id' => $response->json('id'),
            'subject' => 'subject',
            'content' => 'content',
            'sent' => true
        ]);

        $this->assertDatabaseHas('message_user', [
            'message_id' => $response->json('id'),
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
            'user_id' => $this->user->id,
            'subject' => 'subject',
            'content' => 'content',
            'sent' => false
        ]);

        $this->assertDatabaseHas('message_user', [
            'message_id' => $response->json('id'),
            'user_id' => $this->other1->id,
        ]);

        $this->assertDatabaseHas('message_user', [
            'message_id' => $response->json('id'),
            'user_id' => $this->other2->id,
        ]);
    }

    public function test_not_logged_in_user_cannot_send_message()
    {
        $response = $this->putJson(route('message.store', [
            'from_user' => $this->user->id,
            'subject' => 'subject',
            'content' => 'content',
            'recipients' => [$this->other1->id],
        ]));

        $response->assertStatus(401);
    }
}
