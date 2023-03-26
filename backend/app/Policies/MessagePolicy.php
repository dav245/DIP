<?php

namespace App\Policies;

use App\Enums\MessageType;
use App\Models\Message;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class MessagePolicy
{
    use HandlesAuthorization;

    public function viewOwn(User $user): Response | bool
    {
        return true;
    }

    public function view(User $user, Message $message): Response | bool
    {
        return $message->isSentBy($user);
    }

    public function create(User $user): Response | bool
    {
        return true;
    }

    public function update(User $user, Message $message): Response | bool
    {
        return $message->isSentBy($user) && $message->type === MessageType::DRAFT();
    }

    public function send(User $user, Message $message): Response | bool
    {
        return $message->isSentBy($user) && $message->type === MessageType::DRAFT();
    }

    public function delete(User $user, Message $message): Response | bool
    {
        return $message->isSentBy($user);
    }

    public function new(User $user): Response | bool
    {
        return true;
    }
}
