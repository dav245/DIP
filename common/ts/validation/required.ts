import { RuleType } from "./ruleType";

export const getRequired: () => RuleType = () => ({
  validate: async (value) => {
    return !(
      value === undefined ||
      value === null ||
      value === "" ||
      (Array.isArray(value) && value.length === 0)
    );
  },
  message: () => "Toto pole je povinné",
});
