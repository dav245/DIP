<script lang="ts" setup>
import CButton from "./CButton.vue";
import CLink from "./CLink.vue";
import { formatApiDateString } from "@common/ts/api/date";
import { Message } from "@common/ts/api/message";
import { deleteMessage } from "@common/ts/api/deleteMessage";
import { withLoading } from "@/utils/loadingState";
import { defineComponent, h } from "vue";

const props = defineProps<{
  messages: Message[];
  showUser: (message: Message) => string;
  onDeleted?: (messageId: string | number) => void;
}>();

const createContentPreview = (content: string) =>
  content.length > 100 ? content.slice(0, 100) + " ..." : content;

const deleteButton = defineComponent({
  props: {
    messageId: {
      type: [Number, String],
      required: true,
    },
  },

  setup(innerProps) {
    const { loading, run: deleteMessageOnClick } = withLoading(
      deleteMessage,
      () => props.onDeleted?.(innerProps.messageId)
    );

    return () =>
      h(
        CButton,
        {
          size: "medium",
          color: "error",
          disabled: loading.value,
          loading: loading.value,
          confirm: true,
          onClick: () => deleteMessageOnClick(innerProps.messageId),
        },
        {
          default: ({ shouldConfirm }: { shouldConfirm: boolean }) =>
            shouldConfirm ? "Opravdu smazat?" : "Smazat",
        }
      );
  },
});
</script>

<template>
  <ul>
    <li v-for="message in messages" class="message-list-item">
      <span class="message-list-item-user">
        {{ showUser(message) }}
      </span>
      <span class="message-list-item-date">
        {{ formatApiDateString(message.created_at) }}
      </span>
      <span class="message-list-item-subject {">
        {{ message.message_content?.subject }}
      </span>
      <span class="message-list-item-content">
        {{ createContentPreview(message.message_content?.content ?? "") }}
      </span>
      <span class="message-list-item-action">
        <c-link
          :to="{ name: 'messageDetail', params: { messageId: message.id } }"
        >
          <c-button size="medium"> Zobrazit </c-button>
        </c-link>
        <delete-button :message-id="message.id" />
      </span>
    </li>
  </ul>
</template>
