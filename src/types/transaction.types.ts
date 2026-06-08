export type Transaction = {
  type: TransactionType;
  eurAmount: number;
  btcAmount: number;
  timestamp: number;
};

export type TransactionType = "buy" | "sell";
