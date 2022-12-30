import { RuleType } from "./ruleType";

export const passwordConfirmRule: (getOther: () => string) => RuleType = (
  getOther
) => ({
  validate: async (value) => {
    if (value === undefined || value === null) return true;
    if (typeof value !== "string") return false;

    return value === getOther();
  },
  message: () => "Hodnoty se neshodují",
});
