<script lang="ts">
  import { Route } from "svelte-router-spa";
  import type { RouteProps } from "svelte-router-spa/types/components/route";

  export let params: RouteProps["params"];
  export let currentRoute: RouteProps["currentRoute"];
</script>

<main class="guest-layout">
  <Route {currentRoute} {params} />
</main>
