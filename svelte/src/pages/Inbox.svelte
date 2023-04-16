<script lang="ts">
  import CMessageList from "@/components/CMessageList.svelte";
  import CCard from "@/components/CCard.svelte";
  import CLink from "@/components/CLink.svelte";
  import CButton from "@/components/CButton.svelte";
  import type { Message } from "@common/ts/api/message";
  import { getReceivedMessages } from "@common/ts/api/getReceivedMessages";
  import { onMount } from "svelte";
  import type { RouteProps } from "svelte-router-spa/types/components/route";
  import { ignoreUnusedRouteInfo } from "@/utils/router";

  export let params: RouteProps["params"];
  export let currentRoute: RouteProps["currentRoute"];

  ignoreUnusedRouteInfo(currentRoute, params);

  let messages: Message[] = [];

  const showUser = (message: Message): string =>
    message.message_content?.user?.nickname ?? "";

  onMount(async () => {
    const response = await getReceivedMessages();

    if (response) {
      messages = response.messages;
    }
  });

  const onDeleted = (messageId: string | number) => {
    messages = messages.filter((message) => message.id !== messageId);
  };
</script>

<CCard title="Seznam přijatých zpráv">
  <CMessageList {messages} {showUser} {onDeleted}>
    <CLink slot="actions" let:message to={`/new-message/${message.id}`}>
      <CButton size="medium">Odpovědět</CButton>
    </CLink>
  </CMessageList>
</CCard>
