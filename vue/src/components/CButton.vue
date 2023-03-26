<script setup lang="ts">
import { validationStateKey } from "@common/ts/validation/validateFields";
import { useButtonConfirmation } from "@common/ts/api/buttonConfirmation";
import { inject, computed, Ref, ref } from "vue";

const props = defineProps<{
  color?: "primary" | "secondary" | "success" | "error";
  size?: "small" | "medium" | "large";
  loading?: boolean;
  disabled?: boolean;
  confirm?: boolean;
  onClick?: () => void;
}>();

const validationStatus = inject<
  | {
      submitTried: Ref<boolean>;
      isInvalid: Ref<boolean>;
    }
  | undefined
>(validationStateKey, undefined);

const currentColor = computed(() => {
  if (validationStatus?.isInvalid.value) return "error";
  if (validationStatus?.submitTried.value) return "success";

  return props.color;
});

const shouldConfirm = ref(false);
const { setShouldConfirmTimeout, clearShouldConfirmTimeout } =
  useButtonConfirmation(() => (shouldConfirm.value = false));

const onClick = () => {
  if (props.disabled) return;
  if (!props.onClick) return;

  if (props.confirm && !shouldConfirm.value) {
    shouldConfirm.value = true;
    return;
  }
  clearShouldConfirmTimeout();
  shouldConfirm.value = false;

  props.onClick();
};
</script>

<template>
  <button
    v-bind="$attrs"
    class="button"
    :class="{
      button__disabled: disabled,
      [`button__${currentColor}`]: currentColor,
      [`button__${size}`]: size,
      [`button__confirm`]: shouldConfirm,
    }"
    @click="onClick"
    @mouseover="clearShouldConfirmTimeout"
    @mouseout="setShouldConfirmTimeout"
  >
    <slot :shouldConfirm="shouldConfirm" />

    <span v-if="loading" class="loader button-loader" />
  </button>
</template>
