<script setup lang="ts">
import CCard from "@c/CCard.vue";
</script>

<template>
  <c-card title="Card with header"> Some content </c-card>
  <c-card> Card without header </c-card>
  <c-card title="Error" closable> Closable card </c-card>
</template>
