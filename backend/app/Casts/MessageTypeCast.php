<?php

namespace App\Casts;

use App\Enums\MessageType;
use Illuminate\Contracts\Database\Eloquent\CastsAttributes;

class MessageTypeCast implements CastsAttributes
{
    /**
     * Cast the given value.
     *
     * @param  \Illuminate\Database\Eloquent\Model  $model
     * @param  string  $key
     * @param  string  $value
     * @param  array  $attributes
     * @return mixed
     */
    public function get($model, string $key, $value, array $attributes)
    {
        return collect(MessageType::values())->first(fn (MessageType $type) => $type->type() === $value)->type();
    }

    /**
     * Prepare the given value for storage.
     *
     * @param  \Illuminate\Database\Eloquent\Model  $model
     * @param  string  $key
     * @param  MessageType  $value
     * @param  array  $attributes
     * @return mixed
     */
    public function set($model, string $key, $value, array $attributes)
    {
        return $value->type();
    }
}
