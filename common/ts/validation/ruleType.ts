export type RuleType = {
  validate: (
    value?: string | number | boolean | null | undefined
  ) => Promise<boolean>;
  message: (value?: string | number | boolean | null | undefined) => string;
};
