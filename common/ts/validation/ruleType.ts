import { type ValidationValueType } from "./validateFields";

export type RuleType = {
  validate: (value?: ValidationValueType) => Promise<boolean>;
  message: (value?: ValidationValueType) => string;
};
