<script setup lang="ts">
import CForm from "@/components/CForm.vue";
import CCard from "@/components/CCard.vue";
import CInput from "@/components/CInput.vue";
import CRecipientSelect from "@/components/CRecipientSelect.vue";
import CButton from "@/components/CButton.vue";
import { ref } from "vue";
import {
  createMessage,
  CreateMessagePayload,
} from "@common/ts/api/createMessage";

const form = ref<CreateMessagePayload>({
  recipients: [],
  subject: "",
  content: "",
  send: true,
});

const submit = async () => {
  const response = await createMessage(form.value);
};
</script>

<template>
  <c-card title="Naspat novou zprávu">
    <c-form :submit="submit" class="new-message-form">
      <c-recipient-select
        v-model:value="form.recipients"
        required
        label="Komu"
        name="recipients"
      />
      <c-input
        v-model:value="form.subject"
        required
        label="Předmět"
        name="subject"
      />
      <c-input
        v-model:value="form.content"
        required
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
