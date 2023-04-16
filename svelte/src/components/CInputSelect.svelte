<script lang="ts">
  import type { SelectItem } from "@common/ts/api/select";
  import { getRequired } from "@common/ts/validation/required";
  import type { RuleType } from "@common/ts/validation/ruleType";
  import {
    type ValidationField,
    validationFieldsKey,
    validationStateKey,
  } from "@common/ts/validation/validateFields";
  import { onMount } from "svelte";
  import type { Writable } from "svelte/store";
  import { getContext, onDestroy } from "svelte";

  export let items: SelectItem[];
  export let name: string;
  export let label: string;
  export let state: "success" | "error" = null;
  export let required: boolean = false;
  export let disabled: boolean = false;
  export let value: (string | number)[] | string | number;
  export let rules: RuleType[] = [];
  export let multiple: boolean = false;

  let search = "";
  let element: HTMLInputElement | HTMLTextAreaElement;
  let innerValue: string | number | (string | number)[] = multiple
    ? value ?? []
    : value ?? "";
  let errorMessages: string[] = [];
  let isOpen: boolean = false;
  let hasFocus: boolean = false;

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

  const validationStatus = getContext<
    | {
        submitTried: Writable<boolean>;
        isInvalid: Writable<boolean>;
      }
    | undefined
  >(validationStateKey);

  $: {
    if (value !== undefined) {
      innerValue = value;
    }
  }

  const updateInput = (event: Event) => {
    if (disabled) return;
    const target = event.target as HTMLInputElement;

    if (isOpen) {
      search = target.value;
    } else {
      value = target.value;
      innerValue = target.value;

      if (errorMessages.length) registerField?.revalidate();
    }
  };

  $: currentState = errorMessages.length
    ? "error"
    : validationStatus?.submitTried
    ? "success"
    : state;

  const isSelected = (item: SelectItem): boolean => {
    if (Array.isArray(innerValue)) {
      return innerValue.some((i) => i === item.value);
    }
    return innerValue === item.value;
  };

  const close = () => {
    isOpen = false;
    search = "";
  };

  const selectItem = (item: SelectItem) => {
    if (item.disabled) return;

    search = "";

    if (Array.isArray(innerValue)) {
      if (isSelected(item)) {
        innerValue = innerValue.filter((i) => i !== item.value);
      } else {
        innerValue = [...innerValue, item.value];
      }
    } else {
      innerValue = item.value;
      close();
    }

    value = innerValue;
  };

  const onClickEvent = (e: Event) => {
    if (e.target !== element) {
      close();
    }
  };
  const onKeydownEvent = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      close();
    }
  };

  onMount(() => {
    document.addEventListener("click", onClickEvent);
    document.addEventListener("keydown", onKeydownEvent);
  });
  onDestroy(() => {
    document.removeEventListener("click", onClickEvent);
    document.removeEventListener("keydown", onKeydownEvent);
  });

  const getLabel = (value: string | number) =>
    items.find((item) => item.value === value)?.label;

  $: formattedInnerValue = Array.isArray(innerValue)
    ? innerValue.map(getLabel).join(", ")
    : getLabel(innerValue);

  $: filteredItems = items.filter((item) => item.label.includes(search));

  const itemKeyDown = (e: KeyboardEvent, item: SelectItem, index: number) => {
    if (e.key === "Enter") {
      selectItem(item);
    }
    if (e.key === "Tab") {
      index === filteredItems.length - 1 ? (isOpen = false) : null;
    }
  };

  const closeOnShiftTab = (e: KeyboardEvent) => {
    if (e.shiftKey && e.key == "Tab") {
      isOpen = false;
    }
  };
</script>

<div
  class={`input-select-with-label ${
    currentState ? `input-select__state-${currentState}` : ""
  }`}
>
  {#if label}
    <label class="label">{label}</label>
  {/if}
  <input
    bind:this={element}
    value={isOpen && hasFocus ? search : formattedInnerValue}
    readonly={!isOpen}
    {name}
    class="input-select"
    class:has-focus={isOpen}
    {disabled}
    placeholder=" "
    autocomplete="off"
    on:input={updateInput}
    on:focus={() => (isOpen = true)}
    on:focusin={() => (hasFocus = true)}
    on:focusout={() => (hasFocus = false)}
    on:click={() => (isOpen = true)}
    on:keydown={closeOnShiftTab}
  />
  <div class="input-select-items" class:is-open={isOpen}>
    <ul>
      {#if filteredItems.length === 0}
        <li class="disabled" on:click|stopPropagation>Nic nenalezeno</li>
      {/if}
      {#each filteredItems as item, index}
        <li
          class:selected={isSelected(item)}
          class:disabled={item.disabled}
          tabindex={0}
          on:click|stopPropagation={() => selectItem(item)}
          on:keydown={(e) => itemKeyDown(e, item, index)}
        >
          {item.label}
        </li>
      {/each}
    </ul>
  </div>
  <ul class="input-select-messages">
    {#each errorMessages as errorMessage}
      <li>
        {errorMessage}
      </li>
    {/each}
  </ul>
</div>
