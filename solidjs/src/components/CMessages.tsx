import { hideMessage, messageQueue } from "@/utils/messages";
import CCard from "./CCard";
import { For, Portal } from "solid-js/web";
import { Component } from "solid-js";

const CMessages: Component = () => {

  return (
    <Portal mount={document.body}>
      <section class="message-area">
        <For each={messageQueue()}>
          {(message, index) =>
            <CCard
              title={message.title}
              color={message.type}
              class="message"
              closable
              close={() => hideMessage(index())}
            >
              {message.content}
            </CCard>
          }
        </For>
      </section>
    </Portal>
  )
}

export default CMessages;