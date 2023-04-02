import CMessageList from "@/components/CMessageList";
import CCard from "@/components/CCard";
import CLink from "@/components/CLink";
import CButton from "@/components/CButton";
import { Message } from "@common/ts/api/message";
import { getReceivedMessages } from "@common/ts/api/getReceivedMessages";
import { Component, createSignal, onMount } from "solid-js";
import CAppLayout from "@c/CAppLayout";

const Inbox: Component = () => {
  const [messages, setMessages] = createSignal<Message[]>([]);

  const showUser = (message: Message): string =>
    message.message_content?.user?.nickname ?? "";

  onMount(async () => {
    const response = await getReceivedMessages();

    if (response) {
      setMessages(response.messages);
    }
  });

  const onDeleted = (messageId: string | number) => {
    setMessages((prev) => prev.filter((message) => message.id !== messageId));
  };

  return (
    <CAppLayout>
      <CCard title="Seznam přijatých zpráv">
        <CMessageList
          messages={messages()}
          showUser={showUser}
          onDeleted={onDeleted}
          actions={(message) =>
            <CLink to={`/new-message/${message.id}`}>
              <CButton size="medium"> Odpovědět </CButton>
            </CLink>
          }
        />
      </CCard>
    </CAppLayout>
  )
}

export default Inbox;