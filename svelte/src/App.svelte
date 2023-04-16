<script lang="ts">
  import { Router } from "svelte-router-spa";
  import { routes } from "@/utils/router";

  import CMessages from "@c/CMessages.svelte";
</script>

<CMessages />
<Router {routes} />
