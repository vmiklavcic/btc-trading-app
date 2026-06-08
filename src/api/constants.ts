export const COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3";
export const COINGECKO_API_KEY = import.meta.env.VITE_COINGECKO_API_KEY;

export const BTC_API_CONFIG = {
  coin: "bitcoin",
  currency: "eur",
  chartDays: 1,
};

// CoinGecko refreshes price data every 60 seconds for simple price API; polling faster would be redundant
export const LATEST_PRICE_REFETCH_INTERVAL_MS = 60 * 1000;

// CoinGecko refreshes price data every 30 seconds for market chart API; polling faster would be redundant
export const CHART_PRICES_REFETCH_INTERVAL_MS = 30 * 1000;
