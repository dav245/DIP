<?php

namespace App\Http\Requests\Message;

/**
 * @property string $from_user
 * @property string $subject
 * @property string $content
 * @property int[] $recipients
 */
trait CommonMessageRules
{
    public function commonRules()
    {
        return [
            'from_user' => 'required',
            'subject' => ['required', 'max:255'],
            'content' => ['required', 'max:3000'],
            'recipients' => ['required', 'array', 'min:1'],
            'recipients.*' => ['required', 'integer', 'exists:users']
        ];
    }
}
