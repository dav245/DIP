<script lang="ts">
  import { getRequired } from "@common/ts/validation/required";
  import type { RuleType } from "@common/ts/validation/ruleType";
  import {
    type ValidationField,
    validationFieldsKey,
    validationStateKey,
  } from "@common/ts/validation/validateFields";
  import { getContext } from "svelte";
  import { tick } from "svelte";
  import type { Writable } from "svelte/store";

  export let name: string;
  export let label: string;
  export let state: "success" | "error" = null;
  export let required: boolean = false;
  export let value: string = "";
  export let rules: RuleType[] = [];
  export let type: string = "input";
  export let disabled: boolean = false;
  export let autocomplete: boolean = false;
  export let validationMode: "lazy" | "eager" = "lazy";

  let element: HTMLInputElement | HTMLTextAreaElement;
  let innerValue = value ?? "";
  let errorMessages: string[] = [];

  let style = {
    height: "auto",
  };

  const field: ValidationField = {
    getValue: () => innerValue,
    rules: (required ? [getRequired()] : []).concat(rules ?? []),
    setMessage: (messages) => (errorMessages = messages),
  };

  const registerField = getContext<{
    register: (field: ValidationField) => void;
    revalidate: () => void;
  }>(validationFieldsKey);
  registerField?.register(field);

  const { submitTried } =
    getContext<
      | {
          submitTried: Writable<boolean>;
        }
      | undefined
    >(validationStateKey) ?? {};

  $: {
    if (value !== undefined) {
      innerValue = value;
    }
  }

  const updateInput = (event: Event) => {
    if (disabled) return;
    const target = event.target as HTMLInputElement;

    value = target.value;
    innerValue = target.value;

    if (errorMessages.length || validationMode === "eager")
      registerField?.revalidate();
  };

  $: {
    value;
    (async () => {
      await tick();
      if (type === "textarea") {
        style.height = "5px";
        style.height = (element?.scrollHeight ?? 0) + 2 + "px";
      }
    })();
  }

  $: currentState = errorMessages.length
    ? "error"
    : $submitTried
    ? "success"
    : state;

  const select = () => {
    element?.select();
  };

  export const cursorToStart = () => {
    element?.focus();
    element?.setSelectionRange(0, 0);
  };
</script>

<div
  class={`input-with-label ${
    currentState ? `input__state-${currentState}` : ""
  }`}
>
  {#if label}
    <label class="label">{label}</label>
  {/if}
  <svelte:element
    this={type === "textarea" ? "textarea" : "input"}
    bind:this={element}
    style:height={style.height}
    value={innerValue}
    {name}
    {type}
    class="input"
    {disabled}
    placeholder=" "
    autocomplete={autocomplete ? "on" : "off"}
    on:input={updateInput}
  />
  <ul class="input-messages">
    {#each errorMessages as errorMessage}
      <li>
        {errorMessage}
      </li>
    {/each}
  </ul>
</div>
