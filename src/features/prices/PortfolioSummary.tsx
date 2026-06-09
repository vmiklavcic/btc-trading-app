import { useLatestMarketPrice } from "../../hooks/useLatestMarketPrice";
import { useAppSelector } from "../../store/hooks";
import { formatEur } from "../../utils/priceFormatters";
import { calculatePnl } from "./utils/calculatePnl";

const PortfolioSummary = () => {
  const { data: latestMarketPrice, error } = useLatestMarketPrice();
  const { eur, btc } = useAppSelector((state) => state.balance);

  const pnl = latestMarketPrice ? calculatePnl(eur, btc, latestMarketPrice) : 0;

  const pnlClass = pnl !== 0 ? (pnl > 0 ? "text-profit" : "text-red-700") : "";

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
          <span className="text-xs">
            PnL:{" "}
            <span
              className={pnlClass}
            >{`${pnl > 0 ? "+" : ""}${formatEur(pnl)} €`}</span>{" "}
          </span>
        </div>
      )}
    </div>
  );
};

export default PortfolioSummary;
