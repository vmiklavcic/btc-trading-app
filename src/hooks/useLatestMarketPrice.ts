import { useQuery } from "@tanstack/react-query";
import { LATEST_PRICE_REFETCH_INTERVAL_MS } from "../api/constants";
import fetchLatestPrice from "../api/fetchLatestPrice";

export const useLatestMarketPrice = () => {
  return useQuery<number>({
    queryKey: ["latestMarketPrice"],
    queryFn: fetchLatestPrice,
    refetchInterval: LATEST_PRICE_REFETCH_INTERVAL_MS,
    // staleness checks are redundant because we are refetching
    staleTime: Infinity,
  });
};
