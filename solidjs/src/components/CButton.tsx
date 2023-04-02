import { Accessor, Component, createSignal, JSX, Show } from "solid-js";
import { useButtonConfirmation } from "@common/ts/api/buttonConfirmation";
import { useValidation } from "./CForm";

export const CButton: Component<{
  children: JSX.Element | ((shouldConfirm: Accessor<boolean>) => JSX.Element),
  class?: string;
  color?: "primary" | "secondary" | "success" | "error";
  size?: "small" | "medium" | "large";
  loading?: boolean;
  disabled?: boolean;
  confirm?: boolean;
  onClick?: () => void;
  shouldConfirm?: string;
}> = (props) => {
  const validationStatus = useValidation();

  const currentColor = () => {
    if (validationStatus?.isInvalid()) return "error";
    if (validationStatus?.submitTried()) return "success";

    return props.color;
  };

  const [shouldConfirm, setShouldConfirm] = createSignal(false);
  const { setShouldConfirmTimeout, clearShouldConfirmTimeout } =
    useButtonConfirmation(() => setShouldConfirm(false));

  const onClick = () => {
    if (props.disabled) return;
    if (!props.onClick) return;

    if (props.confirm && !shouldConfirm()) {
      setShouldConfirm(true);
      return;
    }
    clearShouldConfirmTimeout();
    setShouldConfirm(false);

    props.onClick();
  };

  return (
    <button
      class={props.class}
      classList={{
        button: true,
        button__disabled: props.disabled,
        [`button__${currentColor()}`]: !!currentColor(),
        [`button__${props.size}`]: !!props.size,
        [`button__confirm`]: shouldConfirm(),
      }}
      onClick={onClick}
      onMouseOver={clearShouldConfirmTimeout}
      onMouseOut={setShouldConfirmTimeout}
    >
      <Show when={props.loading}>
        <span class="loader button-loader" />
      </Show>

      {typeof props.children === 'function' ? props.children(shouldConfirm) : props.children}
    </button>
  )
}

export default CButton;