import { MIN_TICK_CLEARANCE } from "../constants/constants";

export const getChartTicks = (
  data: { price: number }[],
  prevClose: number,
  count = 5,
): number[] => {
  const prices = data.map((d) => d.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const step = (max - min) / (count - 1);

  const ticks = Array.from({ length: count }, (_, i) =>
    Math.round(min + i * step),
  );

  // Remove ticks that would overlap with the prevClose
  const threshold = step * MIN_TICK_CLEARANCE;
  const filtered = ticks.filter((t) => Math.abs(t - prevClose) > threshold);

  return [...filtered].sort((a, b) => a - b);
};
