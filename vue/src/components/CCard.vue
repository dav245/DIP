<script setup lang="ts">
import CButton from "./CButton.vue";

defineProps<{
  title?: string;
  closable?: boolean;
  color?: "primary" | "secondary" | "success" | "error";
}>();

const emits = defineEmits<{ (e: "close"): void }>();
</script>

<template>
  <section class="card" :class="`card__${color}`">
    <header v-if="$slots.header || title" class="card-header">
      <slot name="header">
        <h2 class="header">{{ title }}</h2>
      </slot>

      <div class="card-header-toolbox">
        <c-button
          v-if="closable"
          size="small"
          :color="color"
          @click="emits('close')"
        >
          X
        </c-button>
      </div>
    </header>
    <slot />
  </section>
</template>
