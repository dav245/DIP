import { useStore } from "@/utils/store";
import CAppLayout from "@c/CAppLayout";
import CMessageDetail from "@c/CMessageDetail";
import { getMessage } from "@common/ts/api/getMessage";
import { Message } from "@common/ts/api/message";
import { useParams } from "@solidjs/router";
import { Component, Show, createSignal, onMount } from "solid-js";

const MessageDetail: Component = () => {
  const params = useParams();

  const [message, setMessage] = createSignal<Message>();

  const store = useStore();

  onMount(async () => {
    const response = await getMessage(params.messageId);

    if (response) {
      setMessage(response.message);
      store.setMenuNewMessages(response.numberOfNewMessages);
    }
  });

  return (
    <CAppLayout>
      <Show when={message()} keyed>
        {(value: Message) => <CMessageDetail message={value} />}
      </Show>
    </CAppLayout>
  );
}

export default MessageDetail;