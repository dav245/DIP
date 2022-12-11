<script setup lang="ts">
import { validationStateKey } from "@/common/ts/validation/validateFields";
import { inject, computed, Ref } from "vue";

const props = defineProps<{
  color?: "primary" | "secondary" | "success" | "error";
}>();

const validationStatus = inject<{
  submitTried: Ref<boolean>;
  isInvalid: Ref<boolean>;
}>(validationStateKey);

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
    :class="{ [`button__${currentColor}`]: currentColor }"
  >
    <slot />
  </button>
</template>
