import {
  BTC_API_CONFIG,
  COINGECKO_API_KEY,
  COINGECKO_BASE_URL,
} from "../../../api/constants";
import type { ChartData } from "../types/chart.types";

const fetchMarketChart = async (): Promise<ChartData> => {
  const params = new URLSearchParams({
    x_cg_demo_api_key: COINGECKO_API_KEY,
    vs_currency: BTC_API_CONFIG.currency,
    days: String(BTC_API_CONFIG.chartDays),
  });

  const url = `${COINGECKO_BASE_URL}/coins/${BTC_API_CONFIG.coin}/market_chart?${params}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();

  if (!Array.isArray(data.prices)) {
    throw new Error("Invalid response — missing prices data");
  }

  return data.prices;
};

export default fetchMarketChart;
