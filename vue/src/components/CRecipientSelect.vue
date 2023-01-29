<script lang="ts" setup>
import CInputSelect from "./CInputSelect.vue";
import { ref, onMounted } from "vue";
import { getRecipients } from "@common/ts/api/getRecipients";
import { SelectItem } from "@common/ts/api/select";

const items = ref<SelectItem[]>([
  { label: "Načítám", value: null, disabled: true },
]);

onMounted(async () => {
  const response = await getRecipients();

  if (response) {
    items.value = response.items;
  }
});
</script>

<template>
  <c-input-select v-bind="$attrs" multiple :items="items" />
</template>
