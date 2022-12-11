<script setup lang="ts">
import CInput from "@c/CInput.vue";
</script>

<template>
  <c-input name="test" />
  <c-input label="Some label" name="test" />
  <c-input label="Some label" name="test" state="success" />
  <c-input label="Some label" name="test" state="error" />
</template>
