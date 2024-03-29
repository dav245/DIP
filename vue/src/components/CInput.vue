<script setup lang="ts">
import { getRequired } from "@common/ts/validation/required";
import { RuleType } from "@common/ts/validation/ruleType";
import {
  ValidationField,
  validationFieldsKey,
  validationStateKey,
} from "@common/ts/validation/validateFields";
import { inject, watch, ref, computed, Ref, nextTick } from "vue";

const props = defineProps<{
  name?: string;
  label?: string;
  state?: "success" | "error";
  required?: boolean;
  value?: string;
  rules?: RuleType[];
  type?: string;
  disabled?: boolean;
  autocomplete?: boolean;
  validationMode?: "lazy" | "eager";
}>();

const emits = defineEmits<{
  (e: "update:value", value: string): void;
}>();

const element = ref<HTMLInputElement | HTMLTextAreaElement>();
const innerValue = ref(props.value ?? "");
const errorMessages = ref<string[]>([]);

const style = ref({
  height: "auto",
});

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

const validationStatus = inject<
  | {
      submitTried: Ref<boolean>;
      isInvalid: Ref<boolean>;
    }
  | undefined
>(validationStateKey, undefined);

watch(
  () => props.value,
  (value) => {
    if (value !== undefined) {
      innerValue.value = value;
    }
  }
);

const updateInput = (event: Event) => {
  if (props.disabled) return;
  const target = event.target as HTMLInputElement;

  emits("update:value", target.value);
  innerValue.value = target.value;

  if (errorMessages.value.length || props.validationMode === "eager")
    registerField?.revalidate();
};

watch(
  innerValue,
  async () => {
    await nextTick();
    if (props.type === "textarea") {
      style.value.height = "5px";
      style.value.height = (element.value?.scrollHeight ?? 0) + 2 + "px";
    }
  },
  { immediate: true }
);

const currentState = computed(() => {
  if (errorMessages.value.length) return "error";
  if (validationStatus?.submitTried?.value) return "success";

  return props.state;
});

defineExpose({
  select: () => {
    element.value?.select();
  },
  cursorToStart: () => {
    element.value?.focus();
    element.value?.setSelectionRange(0, 0);
  },
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
    <component
      ref="element"
      :style="style"
      :is="type === 'textarea' ? 'textarea' : 'input'"
      v-bind="$attrs"
      :value="innerValue"
      :name="name"
      :type="type"
      class="input"
      :disabled="disabled"
      placeholder=" "
      :autocomplete="autocomplete ? 'on' : 'off'"
      @input="updateInput"
    />
    <ul class="input-messages">
      <li v-for="errorMessage in errorMessages">
        {{ errorMessage }}
      </li>
    </ul>
  </div>
</template>
