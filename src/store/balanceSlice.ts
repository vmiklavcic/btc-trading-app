import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { INITIAL_EUR_BALANCE } from "./constants";
import type { BuyParams, SellParams } from "./types";

interface BalanceState {
  btc: number;
  eur: number;
}

const initialState: BalanceState = {
  eur: INITIAL_EUR_BALANCE,
  btc: 0,
};

const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    buy: {
      reducer(state, action: PayloadAction<BuyParams>) {
        state.eur -= action.payload.eurSpent;
        state.btc += action.payload.btcBought;
      },
      prepare(payload: BuyParams) {
        return { payload: { ...payload, timestamp: Date.now() } };
      },
    },
    sell: {
      reducer(state, action: PayloadAction<SellParams>) {
        state.eur += action.payload.eurGained;
        state.btc -= action.payload.btcSold;
      },
      prepare(payload: SellParams) {
        return { payload: { ...payload, timestamp: Date.now() } };
      },
    },
  },
});

export const { buy, sell } = balanceSlice.actions;
export default balanceSlice.reducer;
