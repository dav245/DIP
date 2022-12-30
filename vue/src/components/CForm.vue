<script setup lang="ts">
import {
  validateFields,
  ValidationField,
  validationFieldsKey,
  validationStateKey,
} from "@common/ts/validation/validateFields";
import { ref, provide } from "vue";

const props = defineProps<{ submit: () => void }>();

const submitTried = ref(false);
const isInvalid = ref(false);

const fields = ref<ValidationField[]>([]);

const validate = async () => {
  const isValid = await validateFields(fields.value);

  isInvalid.value = !isValid;

  return isValid;
};

provide(validationFieldsKey, {
  register: (field: ValidationField) => {
    fields.value.push(field);
  },
  revalidate: validate,
});

provide(validationStateKey, { submitTried, isInvalid });

const submitForm = async (event: Event) => {
  submitTried.value = true;

  const isValid = await validate();
  if (!isValid) return;

  props.submit();
};
</script>

<template>
  <form @submit.prevent="submitForm" novalidate>
    <slot />
  </form>
</template>
