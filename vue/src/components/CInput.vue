<script setup lang="ts">
import { getRequired } from "@common/ts/validation/required";
import { RuleType } from "@common/ts/validation/ruleType";
import {
  ValidationField,
  validationFieldsKey,
  validationStateKey,
} from "@common/ts/validation/validateFields";
import { inject, watch, ref, computed, Ref, useAttrs } from "vue";

const props = defineProps<{
  name?: string;
  label?: string;
  state?: "success" | "error";
  required?: boolean;
  value?: string;
  rules?: RuleType[];
  type?: string;
}>();

const emits = defineEmits<{
  (e: "update:value", value: string): void;
}>();

const innerValue = ref(props.value ?? "");
const errorMessages = ref<string[]>([]);

const field: ValidationField = {
  getValue: () => innerValue.value,
  rules: (props.required ? [getRequired()] : []).concat(props.rules ?? []),
  setMessage: (messages) => (errorMessages.value = messages),
};

const registerField = inject<{
  register: (field: ValidationField) => void;
  revalidate: () => void;
}>(validationFieldsKey);
registerField?.register(field);

const validationStatus = inject<{
  submitTried: Ref<boolean>;
  isInvalid: Ref<boolean>;
}>(validationStateKey);

watch(
  () => props.value,
  (value) => {
    if (value !== undefined) {
      innerValue.value = value;
    }
  }
);

const updateInput = (event: Event) => {
  const target = event.target as HTMLInputElement;

  emits("update:value", target.value);
  innerValue.value = target.value;

  if (errorMessages.value.length) registerField?.revalidate();
};

const currentState = computed(() => {
  if (errorMessages.value.length) return "error";
  if (validationStatus?.submitTried?.value) return "success";

  return props.state;
});
</script>

<template>
  <div
    class="input-with-label"
    :class="{
      [`input__state-${currentState}`]: currentState,
    }"
  >
    <label v-if="label" class="label">{{ label }}</label>
    <input
      v-bind="$attrs"
      :value="innerValue"
      :name="name"
      :type="type"
      class="input"
      placeholder=" "
      @input="updateInput"
    />
    <ul class="input-messages">
      <li v-for="errorMessage in errorMessages">
        {{ errorMessage }}
      </li>
    </ul>
  </div>
</template>
