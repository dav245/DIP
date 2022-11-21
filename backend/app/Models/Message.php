<?php

namespace App\Models;

use App\Traits\HasBaseTypings;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Message extends Model
{
    use HasFactory, HasBaseTypings;

    public function fromUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function toUsers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'message_user');
    }
}
