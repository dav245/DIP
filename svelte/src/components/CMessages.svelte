<script lang="ts">
  import { hideMessage, messageQueue } from "@/utils/messages";
  import CCard from "./CCard.svelte";
  import CPortal from "./CPortal.svelte";

  export const title: string = "";
</script>

<CPortal>
  <section class="message-area">
    {#each $messageQueue as message, index}
      <CCard
        title={message.title}
        color={message.type}
        class="message"
        closable
        on:close={() => hideMessage(index)}
      >
        {message.content}
      </CCard>
    {/each}
  </section>
</CPortal>
