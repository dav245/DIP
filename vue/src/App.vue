<script setup lang="ts">
import type { Component } from "vue";
import CMessages from "@c/CMessages.vue";
import CAppLayout from "@c/CAppLayout.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const layout = computed<Component | undefined>(() => {
  if (!route.matched.length) return undefined;
  return route.meta.layout?.() ?? CAppLayout;
});
</script>

<template>
  <c-messages />
  <component v-if="layout" :is="layout" />
</template>

<style scoped></style>
