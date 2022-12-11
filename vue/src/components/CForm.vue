<script setup lang="ts">
import {
  validateFields,
  ValidationField,
  validationFieldsKey,
  validationStateKey,
} from "@/common/ts/validation/validateFields";
import { ref, provide } from "vue";

const submitTried = ref(false);
const isInvalid = ref(false);

const fields = ref<ValidationField[]>([]);

const validate = async () => {
  const isValid = await validateFields(fields.value);

  isInvalid.value = !isValid;
};

provide(validationFieldsKey, {
  register: (field: ValidationField) => {
    fields.value.push(field);
  },
  revalidate: validate,
});

provide(validationStateKey, { submitTried, isInvalid });

const submit = async (event: Event) => {
  submitTried.value = true;
  await validate();
};
</script>

<template>
  <form @submit.prevent="submit" novalidate>
    <slot />
  </form>
</template>
