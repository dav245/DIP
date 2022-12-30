<script setup lang="ts">
import { RouteLocationRaw } from "vue-router";

defineProps<{ to: RouteLocationRaw }>();
</script>

<template>
  <router-link :to="to" class="link">
    <slot />
  </router-link>
</template>
