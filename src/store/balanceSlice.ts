import { createSlice } from "@reduxjs/toolkit";

interface BalanceState {
  btc: number;
  eur: number;
}

const initialState: BalanceState = {
  eur: 10000,
  btc: 0,
};

const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {},
});

export default balanceSlice.reducer;
