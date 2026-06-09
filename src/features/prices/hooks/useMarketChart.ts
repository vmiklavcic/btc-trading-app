import { useQuery } from "@tanstack/react-query";
import { CHART_PRICES_REFETCH_INTERVAL_MS } from "../../../api/constants";
import fetchMarketChart from "../api/fetchMarketChart";
import type { ChartData } from "../types/chart.types";

export const useMarketChart = () => {
  return useQuery<ChartData>({
    queryKey: ["marketChart"],
    queryFn: fetchMarketChart,
    refetchInterval: CHART_PRICES_REFETCH_INTERVAL_MS,
    // staleness checks are redundant because we are refetching
    staleTime: Infinity,
  });
};
