<script setup lang="ts">
import CInputSelect from "@c/CInputSelect.vue";
import { SelectItem } from "@common/ts/api/select";

const items: SelectItem[] = [
  { label: "a", value: "a" },
  { label: "b", value: "b" },
  { label: "c", value: "c" },
  { label: "d", value: "d" },
];
</script>

<template>
  <c-input-select name="test" :items="items" />
  <c-input-select name="test" :items="items" multiple />
</template>
