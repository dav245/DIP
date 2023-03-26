<script lang="ts" setup>
import CCard from "@c/CCard.vue";
import { Message } from "@common/ts/api/message";
import { computed } from "vue";

const props = defineProps<{ message: Message }>();

const from = computed(() => props.message.message_content?.user?.nickname);
const subject = computed(() => props.message.message_content?.subject);
const content = computed(() => props.message.message_content?.content);
const to = computed(() =>
  props.message.message_content?.recipients
    ?.map((item) => item.nickname)
    .join(", ")
);
</script>

<template>
  <c-card title="Detail zprávy">
    <div class="message-detail">
      <span>Od: {{ from }}</span>
      <span>Pro: {{ to }}</span>
      <span>Předmět: {{ subject }}</span>
      <span style="white-space: pre-line">
        Obsah:<br />
        {{ content }}
      </span>
    </div>
  </c-card>
</template>
