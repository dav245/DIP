<script setup lang="ts">
import CMessageList from "@/components/CMessageList.vue";
import CCard from "@/components/CCard.vue";
import { ref, onMounted } from "vue";
import { Message } from "@common/ts/api/message";
import { getSentMessages } from "@common/ts/api/getSentMessages";

const messages = ref<Message[]>([]);

const showUser = (message: Message): string =>
  message.message_content?.recipients
    ?.map((user) => user.nickname)
    .join(", ") ?? "";

onMounted(async () => {
  const response = await getSentMessages();

  if (response) {
    messages.value = response.messages;
  }
});

const onDeleted = (messageId: string | number) => {
  messages.value = messages.value.filter((message) => message.id !== messageId);
};
</script>

<template>
  <c-card title="Seznam odeslaných zpráv">
    <c-message-list
      :messages="messages"
      :show-user="showUser"
      @deleted="onDeleted"
    />
  </c-card>
</template>
