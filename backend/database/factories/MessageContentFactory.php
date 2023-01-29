<?php

namespace Database\Factories;

use App\Models\MessageContent;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MessageContent>
 */
class MessageContentFactory extends Factory
{
    public function definition()
    {
        return [
            'subject' => fake()->realText(60),
            'content' => fake()->realText(1200),
            'user_id' => User::factory(),
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (MessageContent $content) {
            $content->recipients()->sync(User::query()->inRandomOrder()->take(5)->pluck('id'));
        });
    }
}
