<script lang="ts">
  import CMessageList from "@/components/CMessageList.svelte";
  import CCard from "@/components/CCard.svelte";
  import type { Message } from "@common/ts/api/message";
  import { getSentMessages } from "@common/ts/api/getSentMessages";
  import { onMount } from "svelte";
  import type { RouteProps } from "svelte-router-spa/types/components/route";
  import { ignoreUnusedRouteInfo } from "@/utils/router";

  export let params: RouteProps["params"];
  export let currentRoute: RouteProps["currentRoute"];

  ignoreUnusedRouteInfo(currentRoute, params);

  let messages: Message[] = [];

  const showUser = (message: Message): string =>
    message.message_content?.recipients
      ?.map((user) => user.nickname)
      .join(", ") ?? "";

  onMount(async () => {
    const response = await getSentMessages();

    if (response) {
      messages = response.messages;
    }
  });

  const onDeleted = (messageId: string | number) => {
    messages = messages.filter((message) => message.id !== messageId);
  };
</script>

<CCard title="Seznam odeslaných zpráv">
  <CMessageList {messages} {showUser} {onDeleted} />
</CCard>
