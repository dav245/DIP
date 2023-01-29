<script setup lang="ts">
import CMessageList from "@/components/CMessageList.vue";
import CCard from "@/components/CCard.vue";
import { ref, onMounted } from "vue";
import { Message, MessageType } from "@common/ts/api/message";
import { getDeletedMessages } from "@common/ts/api/getDeletedMessages";

const messages = ref<Message[]>([]);

const showUser = (message: Message): string => {
  if (message.type === MessageType.TYPE_RECEIVED) {
    return message.message_content?.user?.nickname ?? "";
  }
  return (
    message.message_content?.recipients
      ?.map((user) => user.nickname)
      .join(", ") ?? ""
  );
};

onMounted(async () => {
  const response = await getDeletedMessages();

  if (response) {
    messages.value = response.messages;
  }
});

const onDeleted = (messageId: string | number) => {
  messages.value = messages.value.filter((message) => message.id !== messageId);
};
</script>

<template>
  <c-card title="Seznam smazaných zpráv">
    <c-message-list
      :messages="messages"
      :show-user="showUser"
      @deleted="onDeleted"
    />
  </c-card>
</template>
