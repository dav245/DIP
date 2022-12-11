import { RuleType } from "./ruleType";

export const getRequired: () => RuleType = () => ({
  validate: async (value) => {
    return !(value === undefined || value === null || value === "");
  },
  message: () => "Toto pole je povinné",
});
