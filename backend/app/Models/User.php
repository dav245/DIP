<?php

namespace App\Models;

use App\Enums\MessageType;
use App\Traits\HasBaseTypings;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\HasApiTokens;

/**
 * @property string $nickname
 * @property string $email
 * @property string $password
 * 
 * @property Collection $sentMessages
 */
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasBaseTypings;

    protected $fillable = [
        'nickname',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public static function logged(): self
    {
        return Auth::user();
    }

    public static function findByNickname(string $nickname): ?self
    {
        return User::where('nickname', $nickname)->first();
    }

    public function sentMessages(): HasMany
    {
        return $this->hasMany(Message::class, 'owner_id')->whereNull('sent_from_id');
    }

    public function receivedMessages(): HasMany
    {
        return $this->hasMany(Message::class, 'owner_id')->where('type', MessageType::RECEIVED());
    }
}
