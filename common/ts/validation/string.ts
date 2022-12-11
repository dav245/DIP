import { RuleType } from "./ruleType";

export const stringRule: () => RuleType = () => ({
  validate: async (value) => {
    if (value === undefined || value === null) return true;
    if (typeof value !== "string") return false;

    return value.length <= 258;
  },
  message: () => "Toto pole musí být řetězec o maximální délce 258 znaků",
});
