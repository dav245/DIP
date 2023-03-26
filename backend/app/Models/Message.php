<?php

namespace App\Models;

use App\Casts\MessageTypeCast;
use App\Enums\MessageType;
use App\Traits\HasBaseTypings;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property number $user_id
 * @property number $message_content_id
 * @property MessageType $type
 * @property MessageContent $messageContent
 * @property User $user
 */
class Message extends Model
{
    use HasFactory, HasBaseTypings, SoftDeletes;

    protected $fillable = [
        'type',
        'user_id',
        'message_content_id',
        'seen_at'
    ];

    protected $casts = [
        'type' => MessageTypeCast::class,
        'seen_at' => 'datetime'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function messageContent(): BelongsTo
    {
        return $this->belongsTo(MessageContent::class);
    }

    public function isSentBy(User $other): bool
    {
        return $this->user_id === $other->id;
    }

    public function send()
    {
        $this->type = MessageType::SENT();

        $this->save();

        $messages = $this->messageContent->recipients->map(function (User $recipient) {
            return [
                'user_id' => $recipient->id,
                'message_content_id' => $this->message_content_id,
                'type' => MessageType::RECEIVED()
            ];
        })->toArray();

        Message::insert($messages);
    }

    public function toArray()
    {
        return array_merge(parent::toArray(), ['type' => $this->type->type()]);
    }
}
