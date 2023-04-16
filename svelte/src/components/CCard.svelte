<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import CButton from "./CButton.svelte";
  const dispatch = createEventDispatcher();

  let _class: string = "";
  export { _class as class };
  export let title: string | null = null;
  export let closable: boolean = false;
  export let color: "primary" | "secondary" | "success" | "error" = "primary";
</script>

<section class={`card card__${color} ${_class}`}>
  {#if $$slots.header || title}
    <header class="card-header">
      <slot name="header">
        <h2 class="header">{title}</h2>
      </slot>

      <div class="card-header-toolbox">
        {#if closable}
          <CButton size="small" {color} on:click={() => dispatch("close")}>
            X
          </CButton>
        {/if}
      </div>
    </header>
  {/if}
  <slot />
</section>
