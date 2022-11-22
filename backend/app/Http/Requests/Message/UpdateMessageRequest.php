<?php

namespace App\Http\Requests\Message;

use App\Models\Message;
use Illuminate\Foundation\Http\FormRequest;

class UpdateMessageRequest extends FormRequest
{
    use CommonMessageRules;

    public function authorize()
    {
        /** @var Message $message */
        $message = $this->route('message');

        return !$message->sent;
    }

    public function rules()
    {
        return $this->commonRules();
    }
}
