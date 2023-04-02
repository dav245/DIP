import { getRequired } from "@common/ts/validation/required";
import { RuleType } from "@common/ts/validation/ruleType";
import { ValidationField } from "@common/ts/validation/validateFields";
import { Component, For, createEffect, createSignal } from "solid-js";
import { Dynamic, Show } from "solid-js/web";
import { useValidation, useValidationFields } from "./CForm";

export const CInput: Component<{
  ref?: HTMLInputElement | HTMLTextAreaElement,
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

  updateValue?: (value: string) => void,
}> = (props) => {
  let innerRef: HTMLInputElement | HTMLTextAreaElement | undefined = undefined;

  const [innerValue, setInnerValue] = createSignal(props.value ?? "");
  const [errorMessages, setErrorMessages] = createSignal<string[]>([]);

  const [height, setHeight] = createSignal("auto");

  const field: ValidationField = {
    getValue: innerValue,
    rules: (props.required ? [getRequired()] : []).concat(props.rules ?? []),
    setMessage: (messages) => setErrorMessages([...messages]),
  };

  const registerField = useValidationFields();
  const validationStatus = useValidation();

  registerField?.register(field);

  createEffect(() => {
    if (props.value !== undefined) {
      setInnerValue(props.value);
    }
  });

  createEffect(() => {
    innerValue()
    if (props.type === "textarea") {
      setHeight("5px");
      setHeight((innerRef?.scrollHeight ?? 0) + 2 + "px");
    }
  });

  const currentState = () => {
    if (errorMessages().length) return "error";
    if (validationStatus?.submitTried()) return "success";

    return props.state;
  };

  const updateInput = (event: Event) => {
    if (props.disabled) return;
    const target = event.target as HTMLInputElement;

    props.updateValue?.(target.value);
    setInnerValue(target.value);

    if (errorMessages().length || props.validationMode === "eager")
      registerField?.revalidate();
  };

  return (
    <div
      class="input-with-label"
      classList={{
        [`input__state-${currentState()}`]: !!currentState(),
      }}
    >
      <Show when={props.label}>
        <label class="label">{props.label}</label>
      </Show>
      <Dynamic
        ref={(ref: HTMLInputElement | HTMLTextAreaElement) => { props.ref = ref; innerRef = ref; }}
        style={`height: ${height()}`}
        component={props.type === 'textarea' ? 'textarea' : 'input'}
        value={innerValue()}
        name={props.name}
        type={props.type}
        class="input"
        disabled={props.disabled}
        placeholder=" "
        autocomplete={props.autocomplete ? 'on' : 'off'}
        onInput={updateInput}
      />
      <ul class="input-messages">
        <For each={errorMessages()}>
          {(errorMessage) => <li>{errorMessage}</li>}
        </For>
      </ul>
    </div>
  )
}

export default CInput;