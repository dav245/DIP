import { RuleType } from "./ruleType";

export const passwordLengthRule: () => RuleType = () => ({
  validate: async (value) => {
    if (value === undefined || value === null) return true;
    if (typeof value !== "string") return false;

    return value.length >= 6;
  },
  message: () => "Délka hesla musí být alespoň 6 znaků",
});

export const passwordCapitalRule: () => RuleType = () => ({
  validate: async (value) => {
    if (value === undefined || value === null) return true;
    if (typeof value !== "string") return false;

    return /[A-Z]/.test(value);
  },
  message: () => "Heslo musí obsahovat alespoň jedno velké písmeno",
});

export const passwordNumberRule: () => RuleType = () => ({
  validate: async (value) => {
    if (value === undefined || value === null) return true;
    if (typeof value !== "string") return false;

    return /[0-9]/.test(value);
  },
  message: () => "Heslo musí obsahovat alespoň jednu číslici",
});

export const getPasswordRules: () => RuleType[] = () => [
  passwordLengthRule(),
  passwordCapitalRule(),
  passwordNumberRule(),
];
