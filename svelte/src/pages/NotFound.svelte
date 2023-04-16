<script lang="ts">
  import { ignoreUnusedRouteInfo } from "@/utils/router";
  import type { RouteProps } from "svelte-router-spa/types/components/route";

  export let params: RouteProps["params"];
  export let currentRoute: RouteProps["currentRoute"];

  ignoreUnusedRouteInfo(currentRoute, params);
</script>

Nenalezeno
