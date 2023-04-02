
import { Accessor, Component, createContext, createSignal, JSX, useContext } from "solid-js";
import {
  validateFields,
  ValidationField,
} from "@common/ts/validation/validateFields";

const ValidationContext = createContext<{
  submitTried: Accessor<boolean>,
  isInvalid: Accessor<boolean>
}>();
export const useValidation = () => useContext(ValidationContext);

const ValidationFieldsContext = createContext<{
  register: (field: ValidationField) => void,
  revalidate: () => Promise<Boolean>
}>();
export const useValidationFields = () => useContext(ValidationFieldsContext);

export const CForm: Component<{
  submit: (reset: () => void) => void,
  children: JSX.Element,
  class?: string,
}> = (props) => {
  const [submitTried, setSubmitTried] = createSignal(false);
  const [isInvalid, setIsInvalid] = createSignal(false);

  const [fields, setFields] = createSignal<ValidationField[]>([]);

  const validate = async () => {
    const isValid = await validateFields(fields());

    setIsInvalid(!isValid);

    return isValid;
  };

  const validationFieldsValue = {
    register: (field: ValidationField) => {
      setFields((prev) => [field, ...prev]);
    },
    revalidate: validate,
  };

  const validationValue = {
    submitTried,
    isInvalid
  }

  const submitForm = async (event: Event) => {
    event.preventDefault();
    setSubmitTried(true);

    const isValid = await validate();
    if (!isValid) return;

    props.submit(() => {
      setSubmitTried(false);
      setIsInvalid(false);
    });
  };


  return (
    <form onSubmit={submitForm} novalidate class={props.class}>
      <ValidationFieldsContext.Provider value={validationFieldsValue}>
        <ValidationContext.Provider value={validationValue}>
          {props.children}
        </ValidationContext.Provider>
      </ValidationFieldsContext.Provider>
    </form >
  )
}

export default CForm;