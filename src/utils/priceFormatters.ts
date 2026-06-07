export const formatBtc = (value: number): string => {
  return value.toLocaleString("sl-SI", {
    minimumFractionDigits: 8,
  });
};

export const formatEur = (value: number): string => {
  return value.toLocaleString("sl-SI", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
