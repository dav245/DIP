<script setup lang="ts">
import type { Component } from "vue";
import AppLayout from "@/components/AppLayout.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const layout = computed<Component | undefined>(() => {
  if (!route.matched.length) return undefined;
  return route.meta.layout?.() ?? AppLayout;
});
</script>

<template>
  <component v-if="layout" :is="layout" />
</template>

<style scoped></style>
