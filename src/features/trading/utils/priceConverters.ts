export const eurToBtc = (eur: number, latestPrice: number) => {
  return eur / latestPrice;
};
export const btcToEur = (btc: number, latestPrice: number) => {
  return btc * latestPrice;
};
