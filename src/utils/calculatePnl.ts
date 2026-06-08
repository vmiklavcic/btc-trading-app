import { INITIAL_EUR_BALANCE } from "../store/constants";

export const calculatePnl = (
  fiat: number,
  crypto: number,
  marketPrice: number,
): number => fiat + crypto * marketPrice - INITIAL_EUR_BALANCE;
