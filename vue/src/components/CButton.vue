<script setup lang="ts">
import { validationStateKey } from "@common/ts/validation/validateFields";
import { inject, computed, Ref } from "vue";

const props = defineProps<{
  color?: "primary" | "secondary" | "success" | "error";
  size?: "small" | "medium" | "large";
  loading?: boolean;
  disabled?: boolean;
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
</script>

<template>
  <button
    v-bind="$attrs"
    class="button"
    :class="{
      button__disabled: disabled,
      [`button__${currentColor}`]: currentColor,
      [`button__${size}`]: size,
    }"
    @click="disabled ? null : onClick?.()"
  >
    <slot />

    <span v-if="loading" class="loader button-loader" />
  </button>
</template>
