<script setup lang="ts">
import CMessageList from "@/components/CMessageList.vue";
import CCard from "@/components/CCard.vue";
import CLink from "@/components/CLink.vue";
import CButton from "@/components/CButton.vue";
import { ref, onMounted } from "vue";
import { Message } from "@common/ts/api/message";
import { getReceivedMessages } from "@common/ts/api/getReceivedMessages";

const messages = ref<Message[]>([]);

const showUser = (message: Message): string =>
  message.message_content?.user?.nickname ?? "";

onMounted(async () => {
  const response = await getReceivedMessages();

  if (response) {
    messages.value = response.messages;
  }
});

const onDeleted = (messageId: string | number) => {
  messages.value = messages.value.filter((message) => message.id !== messageId);
};
</script>

<template>
  <c-card title="Seznam přijatých zpráv">
    <c-message-list
      :messages="messages"
      :show-user="showUser"
      @deleted="onDeleted"
    >
      <template #actions="{ message }">
        <c-link :to="{ name: 'newMessage', params: { from: message.id } }">
          <c-button size="medium"> Odpovědět </c-button>
        </c-link>
      </template>
    </c-message-list>
  </c-card>
</template>
