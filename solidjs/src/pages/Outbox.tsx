
import CMessageList from "@/components/CMessageList";
import CCard from "@/components/CCard";
import { Message } from "@common/ts/api/message";
import { getSentMessages } from "@common/ts/api/getSentMessages";
import { Component, createSignal, onMount } from "solid-js";
import CAppLayout from "@c/CAppLayout";

const Outbox: Component = () => {
  const [messages, setMessages] = createSignal<Message[]>([]);

  const showUser = (message: Message): string =>
    message.message_content?.recipients
      ?.map((user) => user.nickname)
      .join(", ") ?? "";

  onMount(async () => {
    const response = await getSentMessages();

    if (response) {
      setMessages(response.messages);
    }
  });

  const onDeleted = (messageId: string | number) => {
    setMessages(prev => prev.filter((message) => message.id !== messageId));
  };

  return (
    <CAppLayout>
      <CCard title="Seznam odeslaných zpráv">
        <CMessageList
          messages={messages()}
          showUser={showUser}
          onDeleted={onDeleted}
        />
      </CCard>
    </CAppLayout>
  )
}

export default Outbox;