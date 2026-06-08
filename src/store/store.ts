import { configureStore } from "@reduxjs/toolkit";
import balanceReducer from "./balanceSlice";
import transactionsReducer from "./transactionsSlice";

export const store = configureStore({
  reducer: {
    balance: balanceReducer,
    transactions: transactionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
