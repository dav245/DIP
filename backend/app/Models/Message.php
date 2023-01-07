<?php

namespace App\Models;

use App\Casts\MessageTypeCast;
use App\Enums\MessageType;
use App\Traits\HasBaseTypings;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property number $user_id
 * @property number $message_content_id
 * @property MessageType $type
 * @property MessageContent $messageContent
 * @property User $user
 */
class Message extends Model
{
    use HasFactory, HasBaseTypings;

    protected $fillable = [
        'type',
        'user_id',
        'message_content_id'
    ];

    protected $casts = [
        'type' => MessageTypeCast::class
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
        return $this->messageContent->user_id === $other->id;
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
}
