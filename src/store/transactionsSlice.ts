import { createSlice } from "@reduxjs/toolkit";
import type { Transaction } from "../features/trading/types/transaction.types";
import { buy, sell } from "./balanceSlice";

interface TransactionsState {
  transactions: Transaction[];
}

const initialState: TransactionsState = {
  transactions: [],
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(buy, (state, action) => {
        state.transactions.push({
          type: "buy",
          eurAmount: action.payload.eurSpent,
          btcAmount: action.payload.btcBought,
          timestamp: action.payload.timestamp,
        });
      })
      .addCase(sell, (state, action) => {
        state.transactions.push({
          type: "sell",
          eurAmount: action.payload.eurGained,
          btcAmount: action.payload.btcSold,
          timestamp: action.payload.timestamp,
        });
      });
  },
});

export default transactionsSlice.reducer;
