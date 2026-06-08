import { useLatestMarketPrice } from "../../hooks/useLatestMarketPrice";
import { formatEur } from "../../utils/priceFormatters";

const PriceSummary = () => {
  const { data: latestMarketPrice, error } = useLatestMarketPrice();

  return (
    <div className="flex flex-col items-center h-16">
      {error && (
        <p className="text-md">
          Unable to load the latest price. Please try again later.
        </p>
      )}
      {!error && latestMarketPrice !== undefined && (
        <div className="text-2xl font-semibold text-center flex flex-col items-center text-dark">
          <span>BTC</span>
          <span>{formatEur(latestMarketPrice)} €</span>
        </div>
      )}
    </div>
  );
};

export default PriceSummary;
