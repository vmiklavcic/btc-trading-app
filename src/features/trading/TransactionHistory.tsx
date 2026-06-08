import { useAppSelector } from "../../store/hooks";
import { formatBtc, formatEur } from "../../utils/priceFormatters";

const TransactionHistory = () => {
  const { transactions } = useAppSelector((state) => state.transactions);
  if (transactions.length === 0) return null;

  return (
    <div className="w-full rounded-xl bg-card p-4">
      {
        //Spread to avoid mutating Redux state before reversing
        [...transactions].reverse().map((transaction) => {
          const btcSign = transaction.type === "buy" ? "+" : "-";
          const eurSign = transaction.type === "buy" ? "-" : "+";
          const transactionTime = new Date(
            transaction.timestamp,
          ).toLocaleString("sl-SI", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          });

          return (
            <p className="flex justify-between" key={transaction.timestamp}>
              <span className="capitalize">{transaction.type}</span>
              <span className="font-semibold">{`${btcSign}${formatBtc(transaction.btcAmount)} BTC / ${eurSign}${formatEur(transaction.eurAmount)} €`}</span>
              <span>{transactionTime}</span>
            </p>
          );
        })
      }
    </div>
  );
};

export default TransactionHistory;
