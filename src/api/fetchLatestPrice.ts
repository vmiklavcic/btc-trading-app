import {
  BTC_API_CONFIG,
  COINGECKO_API_KEY,
  COINGECKO_BASE_URL,
} from "./constants";

const fetchLatestPrice = async (): Promise<number> => {
  const params = new URLSearchParams({
    x_cg_demo_api_key: COINGECKO_API_KEY,
    ids: BTC_API_CONFIG.coin,
    vs_currencies: BTC_API_CONFIG.currency,
  });

  const url = `${COINGECKO_BASE_URL}/simple/price?${params}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  const price = data?.[BTC_API_CONFIG.coin]?.[BTC_API_CONFIG.currency];

  if (typeof price !== "number") {
    throw new Error("Invalid response — missing price data");
  }

  return price;
};

export default fetchLatestPrice;
