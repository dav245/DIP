<?php

namespace App\Http\Requests\Message;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMessageRequest extends FormRequest
{
    use CommonMessageRules;

    public function rules()
    {
        return $this->commonRules();
    }
}
