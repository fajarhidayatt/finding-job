type TOptions = string[];

export const parsingOptionsValue = (options: TOptions) => {
  const result = options.map((option) => ({
    key: option,
    value: option,
  }));

  return result;
};
