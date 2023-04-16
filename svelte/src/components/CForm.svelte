<script lang="ts">
  import {
    validateFields,
    type ValidationField,
    validationFieldsKey,
    validationStateKey,
  } from "@common/ts/validation/validateFields";
  import { setContext } from "svelte";
  import { writable } from "svelte/store";

  let _class: string = "";
  export { _class as class };

  export let submit: (reset: () => void) => void;

  let submitTried = writable(false);
  let isInvalid = writable(false);

  let fields: ValidationField[] = [];

  const validate = async () => {
    const isValid = await validateFields(fields);

    isInvalid.set(!isValid);

    return isValid;
  };

  setContext(validationFieldsKey, {
    register: (field: ValidationField) => {
      fields = [...fields, field];
    },
    revalidate: validate,
  });

  setContext(validationStateKey, { submitTried, isInvalid });

  const submitForm = async (event: Event) => {
    submitTried.set(true);

    const isValid = await validate();
    if (!isValid) return;

    submit(() => {
      submitTried.set(false);
      isInvalid.set(false);
    });
  };
</script>

<form on:submit|preventDefault={submitForm} novalidate class={_class}>
  <slot />
</form>
