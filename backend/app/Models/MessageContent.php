<?php

namespace App\Models;

use App\Traits\HasBaseTypings;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property number $user_id
 * @property number $message_id
 * @property string $subject
 * @property string $content
 * @property Collection $message
 * @property User $user
 * @property Collection $recipients
 */
class MessageContent extends Model
{
    use HasFactory, HasBaseTypings;

    protected $fillable = [
        'user_id',
        'message_id',
        'subject',
        'content',
    ];

    public function messages(): HasMany
    {
        return $this->hasMany(Message::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function recipients(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'message_content_user');
    }
}
