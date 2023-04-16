<script lang="ts">
  import CButton from "./CButton.svelte";
  import CDeleteButton from "./CDeleteButton.svelte";
  import CLink from "./CLink.svelte";
  import { formatApiDateString } from "@common/ts/api/date";
  import { type Message, MessageType } from "@common/ts/api/message";

  export let messages: Message[];
  export let showUser: (message: Message) => string;
  export let onDeleted: (messageId: string | number) => void = () => {};

  const createContentPreview = (content: string) =>
    content.length > 100 ? content.slice(0, 100) + " ..." : content;
</script>

<ul>
  {#each messages as message}
    <li class="message-list-item">
      <span class="message-list-item-user">
        {#if !message.seen_at && message.type === MessageType.TYPE_RECEIVED}
          <span class="menu-badge list-variant" />
        {/if}
        {showUser(message)}
      </span>
      <span class="message-list-item-date">
        {formatApiDateString(message.created_at)}
      </span>
      <span class="message-list-item-subject">
        {message.message_content?.subject}
      </span>
      <span class="message-list-item-content">
        {createContentPreview(message.message_content?.content ?? "")}
      </span>
      <span class="message-list-item-action">
        <slot name="actions" {message} />
        <CLink to={`/message/${message.id}/detail`}>
          <CButton size="medium">Zobrazit</CButton>
        </CLink>
        <CDeleteButton {onDeleted} messageId={message.id} />
      </span>
    </li>
  {/each}
</ul>
