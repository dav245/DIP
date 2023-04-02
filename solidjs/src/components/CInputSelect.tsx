
import { SelectItem } from "@common/ts/api/select";
import { getRequired } from "@common/ts/validation/required";
import { RuleType } from "@common/ts/validation/ruleType";
import { ValidationField } from "@common/ts/validation/validateFields";
import { Accessor, Component, For, Show, createEffect, createSignal, onCleanup, onMount } from "solid-js";
import { useValidation, useValidationFields } from "./CForm";

export const CInputSelect: Component<{
  items: SelectItem[];
  name?: string;
  label?: string;
  state?: "success" | "error";
  required?: boolean;
  disabled?: boolean;
  value?: (string | number)[] | string | number;
  updateValue?: (value: (string | number)[] | string | number) => void;
  rules?: RuleType[];
  multiple?: boolean;
}> = (props) => {

  const [search, setSearch] = createSignal("");
  const [element, setElement] = createSignal<HTMLInputElement | HTMLTextAreaElement>();
  const [innerValue, setInnerValue] = createSignal<string | number | (string | number)[]>(
    props.multiple ? props.value ?? [] : props.value ?? ""
  );
  const [errorMessages, setErrorMessages] = createSignal<string[]>([]);
  const [isOpen, setIsOpen] = createSignal<boolean>(false);
  const [hasFocus, setHasFocus] = createSignal<boolean>(false);

  const field: ValidationField = {
    getValue: innerValue,
    rules: (props.required ? [getRequired()] : []).concat(props.rules ?? []),
    setMessage: (messages) => (setErrorMessages([...messages])),
  };

  const registerField = useValidationFields();
  const validationStatus = useValidation();

  registerField?.register(field);

  createEffect(() => {
    if (props.value !== undefined) {
      setInnerValue(props.value);
    }
  }
  );

  const updateInput = (event: Event) => {
    if (props.disabled) return;
    const target = event.target as HTMLInputElement;

    if (isOpen()) {
      setSearch(target.value);
    } else {
      props.updateValue?.(target.value);
      setInnerValue(target.value);

      if (errorMessages().length) registerField?.revalidate();
    }
  };

  const currentState = () => {
    if (errorMessages().length) return "error";
    if (validationStatus?.submitTried()) return "success";

    return props.state;
  };

  const isSelected = (item: SelectItem): boolean => {
    const value = innerValue();
    if (Array.isArray(value)) {
      return value.some((i) => i === item.value);
    }
    return value === item.value;
  };

  const close = () => {
    setIsOpen(false);
    setSearch("");
  };

  const selectItem = (item: SelectItem) => {
    if (item.disabled) return;

    setSearch("");

    const value = innerValue();

    if (Array.isArray(value)) {
      if (isSelected(item)) {
        setInnerValue(value.filter((i) => i !== item.value));
      } else {
        setInnerValue(() => [item.value, ...value]);
      }
    } else {
      setInnerValue(item.value);
      close();
    }

    props.updateValue?.(innerValue());
  };

  const onClickEvent = (e: Event) => {
    if (e.target !== element()) {
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
  onCleanup(() => {
    document.removeEventListener("click", onClickEvent);
    document.removeEventListener("keydown", onKeydownEvent);
  });

  const formattedInnerValue = () => {
    const getLabel = (value: string | number) =>
      props.items.find((item) => item.value === value)?.label;
    const value = innerValue();

    return Array.isArray(value)
      ? value.map(getLabel).join(", ")
      : getLabel(value);
  };

  const filteredItems = () =>
    props.items.filter((item) => item.label.includes(search()));

  const itemKeyDown = (e: KeyboardEvent, item: SelectItem, index: Accessor<number>) => {
    if (e.key === 'Enter') {
      selectItem(item)
    }
    if (e.key === 'Tab') {
      index() === filteredItems().length - 1 ? (setIsOpen(false)) : null
    }
  }

  const closeOnShiftTab = (e: KeyboardEvent) => {
    if (e.shiftKey && e.key == 'Tab') {
      setIsOpen(false)
    }
  }

  return (
    <div
      class="input-select-with-label"
      classList={{
        [`input-select__state-${currentState()}`]: !!currentState(),
      }}
    >
      <label v-if="label" class="label">{props.label}</label>
      <input
        ref={setElement}
        value={isOpen() && hasFocus() ? search() : formattedInnerValue()}
        readonly={!isOpen()}
        name={props.name}
        class="input-select"
        classList={{ 'has-focus': isOpen() }}
        disabled={props.disabled}
        placeholder=" "
        autocomplete="off"
        onInput={updateInput}
        onFocus={() => setIsOpen(true)}
        onFocusIn={() => setHasFocus(true)}
        onFocusOut={() => setHasFocus(false)}
        onClick={() => setIsOpen(true)}
        onKeyDown={closeOnShiftTab}
      />
      <div class="input-select-items" classList={{ 'is-open': isOpen() }}>
        <ul>
          <Show
            when={filteredItems().length !== 0}
            fallback={
              <li class="disabled" onClick={(e) => e.stopPropagation()}>
                Nic nenalezeno
              </li>
            }>
            <For each={filteredItems()}>
              {(item, index) => <li
                classList={{ selected: isSelected(item), disabled: item.disabled }}
                tabindex="0"
                onClick={(e) => { selectItem(item); e.stopPropagation() }}
                onKeyDown={(e) => itemKeyDown(e, item, index)}
              >
                {item.label}
              </li>}
            </For>
          </Show>

        </ul>
      </div>
      <ul class="input-select-messages">
        <For each={errorMessages()}>
          {(errorMessage) => <li>{errorMessage}</li>}
        </For>
      </ul>
    </div>
  )
}

export default CInputSelect;