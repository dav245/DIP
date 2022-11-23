<?php

namespace App\Models;

use App\Casts\MessageTypeCast;
use App\Enums\MessageType;
use App\Traits\HasBaseTypings;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Collection;

/**
 * @property string $subject
 * @property string $content
 * @property number $owner_id
 * @property MessageType $type
 * @property User $owner
 * @property User|null $sentFrom
 * @property Collection $recipients
 */
class Message extends Model
{
    use HasFactory, HasBaseTypings;

    protected $fillable = [
        'subject',
        'content',
        'type'
    ];

    protected $casts = [
        'type' => MessageTypeCast::class
    ];

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function sentFrom(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function recipients(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'message_user');
    }

    public function isSentBy(User $other): bool
    {
        return $this->owner_id === $other->id;
    }

    public function send()
    {
        $this->type = MessageType::SENT();

        $this->save();

        $messages = $this->recipients->map(function (User $recipient) {
            return [
                'owner_id' => $recipient->id,
                'sent_from_id' => $this->owner->id,
                'subject' => $this->subject,
                'content' => $this->content,
                'type' => MessageType::RECEIVED()
            ];
        })->toArray();

        Message::insert($messages);
    }

    public static function receivedMessages(): Builder
    {
        return static::query()
            ->where('owner_id', User::logged()->id)
            ->where('type', MessageType::RECEIVED());
    }

    public static function sentMessages(): Builder
    {
        return static::query()
            ->where('owner_id', User::logged()->id)
            ->whereNull('sent_from_id');
    }
}
