<?php

namespace App\Http\Controllers;

use App\Enums\MessageType;
use App\Http\Requests\Message\CreateMessageRequest;
use App\Http\Requests\Message\UpdateMessageRequest;
use App\Models\Message;
use App\Models\MessageContent;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class MessageController extends Controller
{
    public function received(): array
    {
        $this->authorize('viewOwn', Message::class);

        return [
            'messages' => User::logged()
                ->receivedMessages()
                ->with(['messageContent.user', 'messageContent.recipients'])
                ->get()
        ];
    }

    public function sent(): array
    {
        $this->authorize('viewOwn', Message::class);

        return [
            'messages' => User::logged()
                ->sentMessages()
                ->with(['messageContent.user', 'messageContent.recipients'])
                ->get()
        ];
    }

    public function drafts(): array
    {
        $this->authorize('viewOwn', Message::class);

        return [
            'messages' => User::logged()
                ->draftMessages()
                ->with(['messageContent.user', 'messageContent.recipients'])
                ->get()
        ];
    }

    public function deleted(): array
    {
        $this->authorize('viewOwn', Message::class);

        return [
            'messages' => User::logged()
                ->deletedMessages()
                ->with(['messageContent.user', 'messageContent.recipients'])
                ->get()
        ];
    }

    public function message(Message $message): array
    {
        $this->authorize('view', $message);

        $message->load('messageContent.recipients', 'messageContent.user');

        return ['message' => $message];
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

    public function delete(Message $message): array
    {
        $this->authorize('delete', $message);

        $message->trashed()
            ? $message->forceDelete()
            : $message->delete();

        return ['deleted' => true];
    }
}
