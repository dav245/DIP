<script lang="ts" setup>
import CMessageDetail from "@c/CMessageDetail.vue";
import { getMessage } from "@common/ts/api/getMessage";
import { Message } from "@common/ts/api/message";
import { ref, onMounted } from "vue";

const props = defineProps<{ messageId: string }>();

const message = ref<Message>();

onMounted(async () => {
  const response = await getMessage(props.messageId);

  if (response) {
    message.value = response.message;
  }
});
</script>

<template>
  <c-message-detail v-if="message" :message="message" />
</template>
