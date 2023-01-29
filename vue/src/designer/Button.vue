<script setup lang="ts">
import CButton from "@c/CButton.vue";

const action = () => console.log("clicked");
</script>

<template>
  <c-button @click="action"> Simple button </c-button>
  <c-button color="secondary" @click="action"> Secondary button </c-button>
  <c-button color="error" @click="action"> Error button </c-button>
  <c-button color="success" @click="action"> Success button </c-button>
  <c-button disabled @click="action"> Simple button </c-button>
  <c-button disabled color="secondary" @click="action">
    Secondary button
  </c-button>
  <c-button disabled color="error" @click="action"> Error button </c-button>
  <c-button disabled color="success" @click="action"> Success button </c-button>
  <c-button loading @click="action"> Loading </c-button>
</template>
