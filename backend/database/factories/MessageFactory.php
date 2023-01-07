<?php

namespace Database\Factories;

use App\Enums\MessageType;
use App\Models\MessageContent;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Message>
 */
class MessageFactory extends Factory
{
    public function definition()
    {
        return [
            'type' => fake()->randomElement(MessageType::values()),
            'user_id' => User::factory(),
            'message_content_id' => fn ($args) => MessageContent::factory()->state(['user_id' => $args['user_id']]),
        ];
    }
}
