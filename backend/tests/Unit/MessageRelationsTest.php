<?php

namespace Tests\Unit;

use App\Models\Message;
use App\Models\User;
use Tests\TestCase;

class MessageRelationsTest extends TestCase
{
    public function test_sent_from_user_relation_works()
    {
        $otherUser = User::factory()->create();
        $message = Message::factory()->create(['sent_from_id' => $otherUser->id]);

        $this->assertEquals($otherUser->id, $message->sentFrom->id);
    }
}
