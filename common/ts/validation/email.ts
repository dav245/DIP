import { RuleType } from "./ruleType";

export const getEmail: () => RuleType = () => ({
  validate: async (value) => {
    if (value === undefined || value === null || value === "") return true;
    if (typeof value === "number" || typeof value === "boolean") return false;
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      value
    );
  },
  message: () => "Toto pole musí být validní email",
});
