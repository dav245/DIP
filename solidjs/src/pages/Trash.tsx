
import CMessageList from "@/components/CMessageList";
import CCard from "@/components/CCard";
import { Message, MessageType } from "@common/ts/api/message";
import { getDeletedMessages } from "@common/ts/api/getDeletedMessages";
import { Component, createSignal, onMount } from "solid-js";
import CAppLayout from "@c/CAppLayout";

const Trash: Component = () => {
  const [messages, setMessages] = createSignal<Message[]>([]);

  const showUser = (message: Message): string => {
    if (message.type === MessageType.TYPE_RECEIVED) {
      return message.message_content?.user?.nickname ?? "";
    }
    return (
      message.message_content?.recipients
        ?.map((user) => user.nickname)
        .join(", ") ?? ""
    );
  };

  onMount(async () => {
    const response = await getDeletedMessages();

    if (response) {
      setMessages(response.messages);
    }
  });

  const onDeleted = (messageId: string | number) => {
    setMessages(prev => prev.filter((message) => message.id !== messageId));
  };

  return (
    <CAppLayout>
      <CCard title="Seznam smazaných zpráv">
        <CMessageList
          messages={messages()}
          showUser={showUser}
          onDeleted={onDeleted}
        />
      </CCard>
    </CAppLayout>
  )
}

export default Trash;