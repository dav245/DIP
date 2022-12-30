<script setup lang="ts">
import { showMessage } from "@/utils/messages";
import CMessages from "@c/CMessages.vue";

showMessage({
  title: "Success",
  content: "Toto je nějaká dobrá zpráva",
  type: "success",
});
showMessage({
  title: "Error",
  content: "Toto je nějaká špatná zpráva",
  type: "error",
});
</script>

<template>
  <c-messages />
</template>
