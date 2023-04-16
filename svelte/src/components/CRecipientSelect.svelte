<script lang="ts">
  import CInputSelect from "./CInputSelect.svelte";
  import { getRecipients } from "@common/ts/api/getRecipients";
  import type { SelectItem } from "@common/ts/api/select";
  import { onMount } from "svelte";

  export let name: string;
  export let label: string;
  export let value: (string | number)[] | string | number;
  export let required: boolean;
  export let disabled: boolean;
  let items: SelectItem[] = [{ label: "Načítám", value: null, disabled: true }];

  onMount(async () => {
    const response = await getRecipients();

    if (response) {
      items = response.items;
    }
  });
</script>

<CInputSelect
  multiple
  {items}
  {name}
  {label}
  {required}
  {disabled}
  bind:value
/>
