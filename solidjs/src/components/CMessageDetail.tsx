
import CCard from "@c/CCard";
import { Message } from "@common/ts/api/message";
import { Component } from "solid-js";

const CMessageDetail: Component<{
  message: Message
}> = (props) => {

  const from = () => props.message.message_content?.user?.nickname;
  const subject = () => props.message.message_content?.subject;
  const content = () => props.message.message_content?.content;
  const to = () => props.message.message_content?.recipients
    ?.map((item) => item.nickname)
    .join(", ")


  return (
    <CCard title="Detail zprávy">
      <div class="message-detail">
        <span>Od: {from}</span>
        <span>Pro: {to}</span>
        <span>Předmět: {subject}</span>
        <span style="white-space: pre-line">
          Obsah:<br />
          {content}
        </span>
      </div>
    </CCard>
  )
}

export default CMessageDetail;