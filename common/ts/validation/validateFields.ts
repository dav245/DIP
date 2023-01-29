import { RuleType } from "./ruleType";

export const validationFieldsKey = Symbol("validationFieldsKey");
export const validationStateKey = Symbol("validationStateKey");

export type ValidationValueType =
  | string
  | number
  | boolean
  | null
  | undefined
  | (string | number)[];

export type ValidationField = {
  getValue: () => ValidationValueType;
  setMessage: (message: string[]) => void;
  rules: RuleType[];
};

export const validateFields = async (
  fields: ValidationField[]
): Promise<boolean> => {
  let result: boolean = true;

  for (const field of fields) {
    let messages: string[] = [];

    for (const rule of field.rules) {
      const value = field.getValue();
      const valid = await rule.validate(value);

      if (!valid) {
        messages.push(rule.message(value));
      }

      result = result && valid;
    }

    field.setMessage(messages);
  }

  return result;
};
