<script lang="ts">
  import { validationStateKey } from "@common/ts/validation/validateFields";
  import { useButtonConfirmation } from "@common/ts/api/buttonConfirmation";
  import { createEventDispatcher, getContext } from "svelte";
  import type { Writable } from "svelte/store";
  const dispatch = createEventDispatcher();

  let _class: string = "";
  export { _class as class };
  export let color: "primary" | "secondary" | "success" | "error" = null;
  export let size: "small" | "medium" | "large" = null;
  export let loading: boolean = false;
  export let disabled: boolean = false;
  export let confirm: boolean = false;
  export let onClick: () => void = () => {};

  const { isInvalid, submitTried } =
    getContext<
      | {
          submitTried: Writable<boolean>;
          isInvalid: Writable<boolean>;
        }
      | undefined
    >(validationStateKey) ?? {};

  $: currentColor = $isInvalid ? "error" : $submitTried ? "success" : color;

  let shouldConfirm = false;
  const { setShouldConfirmTimeout, clearShouldConfirmTimeout } =
    useButtonConfirmation(() => (shouldConfirm = false));

  const onButtonClick = () => {
    dispatch("click");
    if (disabled) return;
    if (!onClick) return;

    if (confirm && !shouldConfirm) {
      shouldConfirm = true;
      return;
    }
    clearShouldConfirmTimeout();
    shouldConfirm = false;

    onClick();
  };
</script>

<button
  class={`button ${disabled ? "button_disabled" : ""} ${
    shouldConfirm ? "button__confirm" : ""
  } ${currentColor ? `button__${currentColor}` : ""} ${
    size ? `button__${size}` : ""
  } ${_class}`}
  on:click={onButtonClick}
  on:mouseover={clearShouldConfirmTimeout}
  on:focus={clearShouldConfirmTimeout}
  on:mouseout={setShouldConfirmTimeout}
  on:blur={setShouldConfirmTimeout}
>
  <slot {shouldConfirm} />

  {#if loading}
    <span class="loader button-loader" />
  {/if}
</button>
