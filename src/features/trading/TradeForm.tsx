import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Loading from "../../components/Loading";
import { useLatestMarketPrice } from "../../hooks/useLatestMarketPrice";
import { buy, sell } from "../../store/balanceSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { DEBOUNCE_MS } from "./constants/constants";
import type { TransactionType } from "./types/transaction.types";
import { btcToEur, eurToBtc } from "./utils/priceConverters";

interface TradeFormProps {
  onClose: () => void;
}

const TradeForm = ({ onClose }: TradeFormProps) => {
  const {
    data: latestMarketPrice,
    isError,
    isLoading,
    refetch,
  } = useLatestMarketPrice();

  const { eur: eurBalance, btc: btcBalance } = useAppSelector(
    (state) => state.balance,
  );
  const dispatch = useAppDispatch();

  const [eurValue, setEurValue] = useState("");
  const [btcValue, setBtcValue] = useState("");
  const [lastEdited, setLastEdited] = useState<"eur" | "btc" | null>(null);
  const [formErrors, setFormErrors] = useState<{ eur?: string; btc?: string }>(
    {},
  );
  const [activeAction, setActiveAction] = useState<TransactionType | null>(
    null,
  );

  useEffect(() => {
    if (!lastEdited || !latestMarketPrice) return;

    const timeout = setTimeout(() => {
      if (lastEdited === "eur") {
        const eur = parseFloat(eurValue);
        setBtcValue(
          isNaN(eur)
            ? ""
            : eurToBtc(eur, latestMarketPrice).toFixed(8).toString(),
        );
      }
      if (lastEdited === "btc") {
        const btc = parseFloat(btcValue);
        setEurValue(
          isNaN(btc)
            ? ""
            : btcToEur(btc, latestMarketPrice).toFixed(2).toString(),
        );
      }
    }, DEBOUNCE_MS);

    return () => clearTimeout(timeout);
  }, [eurValue, btcValue, lastEdited, latestMarketPrice]);

  const handleEurChange = (value: string) => {
    setFormErrors({});
    setEurValue(value);
    setLastEdited("eur");
  };

  const handleBtcChange = (value: string) => {
    setFormErrors({});
    setBtcValue(value);
    setLastEdited("btc");
  };

  const executeTrade = async (
    type: TransactionType,
    onSuccess: (price: number) => void,
  ) => {
    setActiveAction(type);

    // Refetch to avoid trading at a stale price
    const { data: freshPrice, isError } = await refetch();
    if (isError || !freshPrice) {
      setActiveAction(null);
      return;
    }

    onSuccess(freshPrice);
    onClose();
  };

  const handleBuy = async () => {
    if (!eurValue) {
      setFormErrors({ eur: "Amount is required" });
      return;
    }

    const eurSpent = parseFloat(eurValue);
    if (eurSpent <= 0) {
      setFormErrors({ eur: "The value must be higher than 0" });
      return;
    }
    if (eurSpent > eurBalance) {
      setFormErrors({ eur: "Not enough balance" });
      return;
    }

    await executeTrade("buy", (price) =>
      dispatch(
        buy({
          eurSpent,
          btcBought: eurToBtc(eurSpent, price),
        }),
      ),
    );
  };

  const handleSell = async () => {
    if (!btcValue) {
      setFormErrors({ btc: "Amount is required" });
      return;
    }

    const btcSold = parseFloat(btcValue);
    if (btcSold <= 0) {
      setFormErrors({ btc: "The value must be higher than 0" });
      return;
    }
    if (btcSold > btcBalance) {
      setFormErrors({ btc: "Not enough balance" });
      return;
    }

    await executeTrade("sell", (price) =>
      dispatch(
        sell({
          eurGained: btcToEur(btcSold, price),
          btcSold,
        }),
      ),
    );
  };

  return (
    <div>
      {isLoading && (
        <div className="p-6">
          <Loading />
        </div>
      )}
      {isError && (
        <p className="text-md p-6">
          Unable to load the latest price. Please try again later.
        </p>
      )}
      {!isLoading && !isError && (
        <div className="flex flex-col gap-2 pt-10 p-6">
          <Input
            value={eurValue}
            unit={"EUR"}
            onChange={handleEurChange}
            error={formErrors.eur}
          />
          <Input
            value={btcValue}
            unit={"BTC"}
            onChange={handleBtcChange}
            error={formErrors.btc}
          />
          <div className="flex justify-between sm:justify-around gap-8">
            <Button
              label="Buy"
              onClick={handleBuy}
              loading={activeAction === "buy"}
              disabled={activeAction !== null}
            />
            <Button
              label="Sell"
              onClick={handleSell}
              loading={activeAction === "sell"}
              disabled={activeAction !== null}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TradeForm;
