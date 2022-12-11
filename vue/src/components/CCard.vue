<script setup lang="ts">
defineProps<{ title?: string }>();
</script>

<template>
  <section class="card">
    <header v-if="$slots.header || title" class="card-header">
      <slot name="header">
        <h2>{{ title }}</h2>
      </slot>
    </header>
    <slot />
  </section>
</template>
