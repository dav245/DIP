<?php

namespace App\Http\Requests\Auth;

use App\Rules\DeviceRule;
use Illuminate\Foundation\Http\FormRequest;

/**
 * @property string $nickname
 * @property string $password
 * @property string $device_name
 */
class RegisterRequest extends FormRequest
{
    public function rules()
    {
        return [
            'nickname' => ['required', 'unique:users'],
            'password' => ['required', 'min:5'],
            'device_name' => ['required', new DeviceRule]
        ];
    }
}
