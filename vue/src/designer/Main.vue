<script setup lang="ts">
import { getDesignerRoutes } from "@/designer/routes";

const routes = getDesignerRoutes();
</script>

<template>
  <router-link v-for="route in routes" :to="{ name: route.name }">
    {{ route.name }}
  </router-link>
</template>
