<script lang="ts">
  import { ignoreUnusedRouteInfo } from "@/utils/router";
  import { useStore } from "@/utils/store";
  import CMessageDetail from "@c/CMessageDetail.svelte";
  import { getMessage } from "@common/ts/api/getMessage";
  import type { Message } from "@common/ts/api/message";
  import type { RouteProps } from "svelte-router-spa/types/components/route";
  import { onMount } from "svelte";

  export let params: RouteProps["params"];
  export let currentRoute: RouteProps["currentRoute"];

  ignoreUnusedRouteInfo(currentRoute, params);

  let message: Message;

  const store = useStore();

  onMount(async () => {
    const response = await getMessage(currentRoute.namedParams.messageId);

    if (response) {
      message = response.message;
      store.menuNewMessages.set(response.numberOfNewMessages);
    }
  });
</script>

{#if message}
  <CMessageDetail {message} />
{/if}
