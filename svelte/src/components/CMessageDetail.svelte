<script lang="ts">
  import CCard from "@c/CCard.svelte";
  import type { Message } from "@common/ts/api/message";

  export let message: Message;

  $: from = message.message_content?.user?.nickname;
  const subject = message.message_content?.subject;
  const content = message.message_content?.content;
  const to = message.message_content?.recipients
    ?.map((item) => item.nickname)
    .join(", ");
</script>

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
