<script lang="ts">
  import { useStore } from "@/utils/store";
  import { logout } from "@common/ts/api/logout";
  import CButton from "./CButton.svelte";
  import CMainMenu from "./CMainMenu.svelte";
  import { Route, navigateTo } from "svelte-router-spa";
  import type { RouteProps } from "svelte-router-spa/types/components/route";

  export let params: RouteProps["params"];
  export let currentRoute: RouteProps["currentRoute"];

  const { userName, isLoggedIn } = useStore();

  if (!$isLoggedIn) {
    navigateTo("/login");
  }

  const doLogout = () => {
    logout();
    isLoggedIn.set(false);
    navigateTo("/login");
  };

  const links = [
    { href: import.meta.env.VITE_BACKEND_URL, name: "Backend" },
    { href: import.meta.env.VITE_VUE_APP_URL, name: "Vue" },
    { href: import.meta.env.VITE_SOLID_APP_URL, name: "Solid JS" },
    {
      href: import.meta.env.VITE_SVELTE_APP_URL,
      name: "Svelte",
      current: true,
    },
  ];
</script>

{#if $isLoggedIn}
  <div class="app-layout">
    <div class="app-layout-header">
      <h1 class="app-layout-header-app-name">Thessenger</h1>

      {$userName}

      <CButton class="app-layout-header-sign-out" on:click={doLogout}>
        Odhlásit se
      </CButton>
    </div>
    <div class="app-layout-sidebar">
      <CMainMenu {currentRoute} />
    </div>
    <div class="app-layout-content">
      <Route {params} {currentRoute} />
    </div>
    <div class="app-layout-footer">
      <div class="app-layout-footer-links">
        {#each links as link}
          {#if link.current}
            <span class="current-app">
              {link.name}
            </span>
          {:else}
            <a href={link.href} target="_blank" class="link">
              {link.name}
            </a>
          {/if}
        {/each}
      </div>
      <span class="app-layout-footer-footnote">
        Diplomová práce Davida Hrůzy
      </span>
    </div>
  </div>
{/if}
