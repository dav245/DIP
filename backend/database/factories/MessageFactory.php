<?php

namespace Database\Factories;

use App\Enums\MessageType;
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
            'subject' => fake()->realText(60),
            'content' => fake()->realText(1200),
            'type' => fake()->randomElement(MessageType::values()),
            'owner_id' => User::factory(),
        ];
    }
}
