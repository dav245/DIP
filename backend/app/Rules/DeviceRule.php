<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class DeviceRule implements Rule
{
    public const VALID_DEVICES = ['vue', 'solid', 'svelte', 'lit'];
    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return in_array($value, static::VALID_DEVICES);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Device must be one of ' . implode(', ', static::VALID_DEVICES);
    }
}
