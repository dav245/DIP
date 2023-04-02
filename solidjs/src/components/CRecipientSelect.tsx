import CInputSelect from "./CInputSelect";
import { getRecipients } from "@common/ts/api/getRecipients";
import { SelectItem } from "@common/ts/api/select";
import { RuleType } from "@common/ts/validation/ruleType";
import { Component, createSignal, onMount } from "solid-js";

const CRecipientSelect: Component<{
  name?: string;
  label?: string;
  state?: "success" | "error";
  required?: boolean;
  disabled?: boolean;
  value?: (string | number)[] | string | number;
  updateValue?: (value: (string | number)[] | string | number) => void;
  rules?: RuleType[];
}> = (props) => {
  const [items, setItems] = createSignal<SelectItem[]>([
    { label: "Načítám", value: null, disabled: true },
  ]);

  onMount(async () => {
    const response = await getRecipients();

    if (response) {
      setItems(response.items);
    }
  });

  return <CInputSelect {...props} multiple items={items()} />
}

export default CRecipientSelect;