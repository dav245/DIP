<?php

namespace App\Http\Requests\Message;

use Illuminate\Foundation\Http\FormRequest;

class CreateMessageRequest extends FormRequest
{
    use CommonMessageRules;

    public function rules()
    {
        return $this->commonRules();
    }
}
