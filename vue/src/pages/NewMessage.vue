<script setup lang="ts">
import CForm from "@/components/CForm.vue";
import CCard from "@/components/CCard.vue";
import CInput from "@/components/CInput.vue";
import CRecipientSelect from "@/components/CRecipientSelect.vue";
import CButton from "@/components/CButton.vue";
import { ref, onMounted, nextTick } from "vue";
import {
  createMessage,
  CreateMessagePayload,
} from "@common/ts/api/createMessage";
import { showMessage } from "@/utils/messages";
import { getMessage } from "@common/ts/api/getMessage";
import { useStore } from "@/utils/store";

const store = useStore();

const props = defineProps<{ from?: string }>();

const loading = ref(!!props.from);
const contentRef = ref();

onMounted(async () => {
  if (!props.from) return;
  const response = await getMessage(props.from);

  if (response) {
    form.value.subject = response.message.message_content?.subject ?? "";
    form.value.content =
      `\n\n------- Původní zpráva -------\n` +
        response.message.message_content?.content ?? "";
    form.value.recipients = (response.message.message_content?.recipients ?? [])
      .concat(
        response.message.message_content?.user
          ? [response.message.message_content.user]
          : []
      )
      .map((user) => user.id)
      .filter((userId) => userId !== store.userId.value);
  }
  loading.value = false;

  await nextTick();
  contentRef.value.cursorToStart();
});

const form = ref<CreateMessagePayload>({
  recipients: [],
  subject: "",
  content: "",
  send: true,
});

const submit = async (reset: () => void) => {
  const response = await createMessage(form.value);

  showMessage({
    title: "Zpráva odeslána",
    type: "success",
    content: "Zpráva byla úspěšně odeslána",
  });

  form.value.subject = "";
  form.value.content = "";
  form.value.recipients = [];

  reset();
};
</script>

<template>
  <c-card title="Naspat novou zprávu">
    <c-form :submit="submit" class="new-message-form">
      <c-recipient-select
        v-model:value="form.recipients"
        required
        :disabled="loading"
        label="Komu"
        name="recipients"
      />
      <c-input
        v-model:value="form.subject"
        required
        :disabled="loading"
        label="Předmět"
        name="subject"
      />
      <c-input
        ref="contentRef"
        v-model:value="form.content"
        required
        :disabled="loading"
        label="Obsah"
        name="content"
        type="textarea"
      />

      <c-button color="success" class="new-message-form-submit">
        Odeslat
      </c-button>
    </c-form>
  </c-card>
</template>
