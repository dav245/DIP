<?php

namespace App\Http\Requests\Message;

use App\Models\Message;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class SendMessageRequest extends FormRequest
{
    use CommonMessageRules;

    public function authorize()
    {
        /** @var Message $message */
        $message = $this->route('message');

        return $message->user_id === User::logged()->id;
    }

    public function rules()
    {
        return [];
    }
}
