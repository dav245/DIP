<?php

namespace App\Http\Controllers;

use App\Http\Requests\Message\CreateMessageRequest;
use App\Http\Requests\Message\UpdateMessageRequest;
use App\Models\Message;
use App\Models\User;
use Illuminate\Contracts\Pagination\Paginator;

class MessageController extends Controller
{
    public function messages(): Paginator
    {
        return Message::query()
            ->where('user_id', User::logged()->id)
            ->paginate();
    }

    public function message(Message $message): Message
    {
        return $message->load('toUsers');
    }

    public function store(CreateMessageRequest $request): Message
    {
        $message = Message::make($request->validated());

        $message->fromUser()->associate(User::logged());

        $message->save();

        $message->toUsers()->sync($request->recipients);

        return $message;
    }

    public function update(UpdateMessageRequest $request, Message $message): Message
    {
        $message->update($request->validated());

        $message->toUsers()->sync($request->recipients);

        return $message;
    }

    public function delete(Message $message)
    {
        $message->delete();
    }
}
