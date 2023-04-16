<script lang="ts">
  import CMessageList from "@/components/CMessageList.svelte";
  import CCard from "@/components/CCard.svelte";
  import { type Message, MessageType } from "@common/ts/api/message";
  import { getDeletedMessages } from "@common/ts/api/getDeletedMessages";
  import { onMount } from "svelte";
  import type { RouteProps } from "svelte-router-spa/types/components/route";
  import { ignoreUnusedRouteInfo } from "@/utils/router";

  export let params: RouteProps["params"];
  export let currentRoute: RouteProps["currentRoute"];

  ignoreUnusedRouteInfo(currentRoute, params);

  let messages: Message[] = [];

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
      messages = response.messages;
    }
  });

  const onDeleted = (messageId: string | number) => {
    messages = messages.filter((message) => message.id !== messageId);
  };
</script>

<CCard title="Seznam smazaných zpráv">
  <CMessageList {messages} {showUser} {onDeleted} />
</CCard>
