<script lang="ts">
  import { getMainMenu, type MainMenu } from "@common/ts/api/mainMenu";
  import CLink from "./CLink.svelte";
  import { checkNewMessages } from "@common/ts/api/checkNewMessages";
  import { useStore } from "@/utils/store";
  import { onDestroy } from "svelte";
  import type { RouteProps } from "svelte-router-spa/types/components/route";
  import { routeIsActive } from "svelte-router-spa";

  export let currentRoute: RouteProps["currentRoute"];

  const { menuNewMessages } = useStore();

  let mainMenus: MainMenu[] = getMainMenu();
  let timeoutId: NodeJS.Timeout | null = null;

  const refreshUnreadMessages = async () => {
    const response = await checkNewMessages();
    menuNewMessages.set(response?.numberOfNewMessages ?? 0);
    timeoutId = setTimeout(refreshUnreadMessages, 1000 * 60);
  };

  refreshUnreadMessages();

  onDestroy(() => {
    if (timeoutId) clearTimeout(timeoutId);
  });
</script>

<nav>
  <ul class="main-menu">
    {#each mainMenus as mainMenu}
      <li>
        <CLink
          to={mainMenu.url}
          class={`main-menu-item ${
            currentRoute && routeIsActive(mainMenu.url)
              ? "main-menu-item__active"
              : ""
          }`}
        >
          {mainMenu.name}
          {#if mainMenu.routeName === "inbox" && $menuNewMessages}
            <span class="menu-badge">
              {$menuNewMessages}
            </span>
          {/if}
        </CLink>
      </li>
    {/each}
  </ul>
</nav>
