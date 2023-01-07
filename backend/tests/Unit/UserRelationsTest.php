<?php

namespace Tests\Unit;

use App\Enums\MessageType;
use App\Models\Message;
use App\Models\User;
use Tests\TestCase;

class UserRelationsTest extends TestCase
{
    public function test_received_messages_relation_works()
    {
        $user = User::factory()->create();
        $message = Message::factory()->create(['user_id' => $user->id, 'type' => MessageType::RECEIVED()]);

        $this->assertEquals($message->id, $user->receivedMessages->first()->id);
    }
}
