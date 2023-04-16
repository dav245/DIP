<script lang="ts">
  import { Navigate } from "svelte-router-spa";

  let _class: string = "";
  export { _class as class };
  export let to: string;
</script>

<Navigate {to} styles={`link ${_class}`}>
  <slot />
</Navigate>
