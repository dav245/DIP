<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  let ref: HTMLElement;
  let portal: HTMLElement;

  onMount(() => {
    portal = document.createElement("div");
    portal.className = "portal";
    document.body.appendChild(portal);
    portal.appendChild(ref);
  });

  onDestroy(() => {
    document.body.removeChild(portal);
  });
</script>

<div class="portal-clone">
  <div bind:this={ref}>
    <slot />
  </div>
</div>

<style>
  .portal-clone {
    display: none;
  }
</style>
