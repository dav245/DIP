<script setup>
import { ref, computed } from "vue";

const value = ref(0);
const double = computed(() => value.value * 2);

const increase = () => (value.value = value.value + 1);
</script>

<template>
  <div>Counter: {{ value }}, Double: {{ double }}</div>
  <button type="button" @click="increase">Increase</button>
</template>
