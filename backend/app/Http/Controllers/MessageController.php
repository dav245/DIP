<?php

namespace App\Http\Controllers;

use App\Enums\MessageType;
use App\Http\Requests\Message\CreateMessageRequest;
use App\Http\Requests\Message\UpdateMessageRequest;
use App\Models\Message;
use App\Models\User;
use Illuminate\Contracts\Pagination\Paginator;

class MessageController extends Controller
{
    public function received(): Paginator
    {
        $this->authorize('viewOwn', Message::class);

        return Message::receivedMessages()->paginate();
    }

    public function sent(): Paginator
    {
        $this->authorize('viewOwn', Message::class);

        return Message::sentMessages()
            ->where('type', MessageType::SENT())
            ->paginate();
    }

    public function drafts(): Paginator
    {
        $this->authorize('viewOwn', Message::class);

        return Message::sentMessages()
            ->where('type', MessageType::DRAFT())
            ->paginate();
    }

    public function message(Message $message): Message
    {
        $this->authorize('view', $message);

        return $message->load('recipients');
    }

    public function store(CreateMessageRequest $request): Message
    {
        $this->authorize('create', Message::class);

        $message = Message::make($request->validated());

        $message->owner()->associate(User::logged());
        $message->type = MessageType::DRAFT();

        $message->save();

        $message->recipients()->sync($request->recipients);

        if ($request->send) {
            $message->send();
        }

        return $message;
    }

    public function update(UpdateMessageRequest $request, Message $message): Message
    {
        $this->authorize('update', $message);

        $message->update($request->validated());

        $message->recipients()->sync($request->recipients);

        if ($request->send) {
            $message->send();
        }

        return $message;
    }

    public function send(Message $message): Message
    {
        $this->authorize('send', $message);

        $message->send();

        return $message;
    }

    public function delete(Message $message): int
    {
        $this->authorize('delete', $message);

        $message->delete();

        return 1;
    }
}
