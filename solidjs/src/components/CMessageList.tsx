
import CButton from "./CButton";
import CLink from "./CLink";
import { formatApiDateString } from "@common/ts/api/date";
import { Message } from "@common/ts/api/message";
import { deleteMessage } from "@common/ts/api/deleteMessage";
import { withLoading } from "@/utils/loadingState";
import { Component, For, JSX } from "solid-js";

const CMessageList: Component<{
  messages: Message[];
  showUser: (message: Message) => string;
  onDeleted?: (messageId: string | number) => void;
  actions?: (message: Message) => JSX.Element
}> = (props) => {

  const createContentPreview = (content: string) =>
    content.length > 100 ? content.slice(0, 100) + " ..." : content;

  const DeleteButton: Component<{
    messageId: number | string,
  }> = (innerProps) => {
    const { loading, run: deleteMessageOnClick } = withLoading(
      deleteMessage,
      () => props.onDeleted?.(innerProps.messageId)
    );

    return (
      <CButton
        size="medium"
        color="error"
        disabled={loading()}
        loading={loading()}
        confirm
        onClick={() => deleteMessageOnClick(innerProps.messageId)}
        children={(shouldConfirm) => shouldConfirm() ? "Opravdu?" : "Smazat"}
      />
    )
  }

  return (

    <ul>
      <For each={props.messages}>
        {(message) => <li class="message-list-item">
          <span class="message-list-item-user">
            <span
              v-if="!message.seen_at && message.type === MessageType.TYPE_RECEIVED"
              class="menu-badge list-variant"
            >
            </span>
            {props.showUser(message)}
          </span>
          <span class="message-list-item-date">
            {formatApiDateString(message.created_at)}
          </span>
          <span class="message-list-item-subject {">
            {message.message_content?.subject}
          </span>
          <span class="message-list-item-content">
            {createContentPreview(message.message_content?.content ?? "")}
          </span>
          <span class="message-list-item-action">
            {props.actions?.(message)}
            <CLink
              to={`/message/${message.id}/detail`}
            >
              <CButton size="medium"> Zobrazit </CButton>
            </CLink>
            <DeleteButton messageId={message.id} />
          </span>
        </li>
        }
      </For>
    </ul >
  )
}

export default CMessageList;