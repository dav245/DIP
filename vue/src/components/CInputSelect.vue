<script setup lang="ts">
import { SelectItem } from "@common/ts/api/select";
import { getRequired } from "@common/ts/validation/required";
import { RuleType } from "@common/ts/validation/ruleType";
import {
  ValidationField,
  validationFieldsKey,
  validationStateKey,
} from "@common/ts/validation/validateFields";
import { inject, watch, ref, computed, Ref, onMounted, onUnmounted } from "vue";

const props = defineProps<{
  items: SelectItem[];
  name?: string;
  label?: string;
  state?: "success" | "error";
  required?: boolean;
  disabled?: boolean;
  value?: (string | number)[] | string | number;
  rules?: RuleType[];
  multiple?: boolean;
}>();

const emits = defineEmits<{
  (e: "update:value", value: string): void;
}>();

const search = ref("");
const element = ref<HTMLInputElement | HTMLTextAreaElement>();
const innerValue = ref<string | number | (string | number)[]>(
  props.multiple ? props.value ?? [] : props.value ?? ""
);
const errorMessages = ref<string[]>([]);
const isOpen = ref<boolean>(false);
const hasFocus = ref<boolean>(false);

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

  if (isOpen.value) {
    search.value = target.value;
  } else {
    emits("update:value", target.value);
    innerValue.value = target.value;

    if (errorMessages.value.length) registerField?.revalidate();
  }
};

const currentState = computed(() => {
  if (errorMessages.value.length) return "error";
  if (validationStatus?.submitTried?.value) return "success";

  return props.state;
});

const isSelected = (item: SelectItem): boolean => {
  if (Array.isArray(innerValue.value)) {
    return innerValue.value.some((i) => i === item.value);
  }
  return innerValue.value === item.value;
};

const close = () => {
  isOpen.value = false;
  search.value = "";
};

const selectItem = (item: SelectItem) => {
  if (item.disabled) return;

  search.value = "";

  if (Array.isArray(innerValue.value)) {
    if (isSelected(item)) {
      innerValue.value = innerValue.value.filter((i) => i !== item.value);
    } else {
      innerValue.value.push(item.value);
    }
  } else {
    innerValue.value = item.value;
    close();
  }
};

const onClickEvent = (e: Event) => {
  if (e.target !== element.value) {
    close();
  }
};
const onKeydownEvent = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    close();
  }
};

onMounted(() => {
  document.addEventListener("click", onClickEvent);
  document.addEventListener("keydown", onKeydownEvent);
});
onUnmounted(() => {
  document.removeEventListener("click", onClickEvent);
  document.removeEventListener("keydown", onKeydownEvent);
});

const formattedInnerValue = computed(() => {
  const getLabel = (value: string | number) =>
    props.items.find((item) => item.value === value)?.label;

  return Array.isArray(innerValue.value)
    ? innerValue.value.map(getLabel).join(", ")
    : getLabel(innerValue.value);
});

const filteredItems = computed(() =>
  props.items.filter((item) => item.label.includes(search.value))
);
</script>

<template>
  <div
    class="input-select-with-label"
    :class="{
      [`input-select__state-${currentState}`]: currentState,
    }"
  >
    <label v-if="label" class="label">{{ label }}</label>
    <input
      ref="element"
      v-bind="$attrs"
      :value="isOpen && hasFocus ? search : formattedInnerValue"
      :readonly="!isOpen"
      :name="name"
      class="input-select"
      :class="{ 'has-focus': isOpen }"
      :disabled="disabled"
      placeholder=" "
      autocomplete="off"
      @input="updateInput"
      @focus="isOpen = true"
      @focusin="hasFocus = true"
      @focusout="hasFocus = false"
      @click="isOpen = true"
      @keydown.shift.tab="isOpen = false"
    />
    <div class="input-select-items" :class="{ 'is-open': isOpen }">
      <ul>
        <li v-if="filteredItems.length === 0" class="disabled" @click.stop>
          Nic nenalezeno
        </li>
        <li
          v-for="(item, index) in filteredItems"
          :class="{ selected: isSelected(item), disabled: item.disabled }"
          :tabindex="0"
          @click.stop="selectItem(item)"
          @keydown.enter="selectItem(item)"
          @keydown.tab="
            index === filteredItems.length - 1 ? (isOpen = false) : null
          "
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
    <ul class="input-select-messages">
      <li v-for="errorMessage in errorMessages">
        {{ errorMessage }}
      </li>
    </ul>
  </div>
</template>
