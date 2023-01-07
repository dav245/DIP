<?php

namespace App\Http\Controllers;

use App\Enums\MessageType;
use App\Http\Requests\Message\CreateMessageRequest;
use App\Http\Requests\Message\UpdateMessageRequest;
use App\Models\Message;
use App\Models\MessageContent;
use App\Models\User;
use Illuminate\Contracts\Pagination\Paginator;
use Illuminate\Support\Facades\DB;

class MessageController extends Controller
{
    public function received(): Paginator
    {
        $this->authorize('viewOwn', Message::class);

        return User::logged()->receivedMessages()->paginate();
    }

    public function sent(): Paginator
    {
        $this->authorize('viewOwn', Message::class);

        return User::logged()->sentMessages()->paginate();
    }

    public function drafts(): Paginator
    {
        $this->authorize('viewOwn', Message::class);

        return User::logged()->draftMessages()->paginate();
    }

    public function message(Message $message): Message
    {
        $this->authorize('view', $message);

        return $message->load('messageContent.recipients');
    }

    public function store(CreateMessageRequest $request): Message
    {
        $this->authorize('create', Message::class);

        return DB::transaction(function () use ($request) {

            $messageContent = MessageContent::create(array_merge(
                $request->only(['content', 'subject']),
                ['user_id' => User::logged()->id]
            ));

            $messageContent->recipients()->sync($request->recipients);

            $message = Message::create([
                'user_id' => User::logged()->id,
                'type' => MessageType::DRAFT(),
                'message_content_id' => $messageContent->id
            ]);

            if ($request->send) {
                $message->send();
            }

            return $message;
        });
    }

    public function update(UpdateMessageRequest $request, Message $message): Message
    {
        $this->authorize('update', $message);

        return DB::transaction(function () use ($request, $message) {

            $message->messageContent()->update($request->only(['subject', 'content']));

            $message->messageContent->recipients()->sync($request->recipients);

            if ($request->send) {
                $message->send();
            }

            return $message;
        });
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
