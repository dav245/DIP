<script setup lang="ts">
import { hideMessage, messageQueue } from "@/utils/messages";
import CCard from "./CCard.vue";

defineProps<{ title?: string }>();
</script>

<template>
  <teleport to="body">
    <section class="message-area">
      <c-card
        v-for="(message, index) in messageQueue"
        :title="message.title"
        :color="message.type"
        class="message"
        closable
        @close="() => hideMessage(index)"
      >
        {{ message.content }}
      </c-card>
    </section>
  </teleport>
</template>
