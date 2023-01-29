<script setup lang="ts">
import CInputSelect from "@c/CInputSelect.vue";
import { SelectItem } from "@common/ts/api/select";

const items: SelectItem[] = [
  { label: "a", value: "a" },
  { label: "b", value: "b" },
  { label: "c", value: "c" },
  { label: "d", value: "d" },
];

const longItems: SelectItem[] = new Array(100)
  .fill(0)
  .map((_, i) => ({ label: String(i), value: i }));
</script>

<template>
  <c-input-select name="test" label="Select" :items="items" />
  <c-input-select name="test" label="Long select" :items="longItems" />
  <c-input-select name="test" label="Multiselect" :items="items" multiple />
</template>
