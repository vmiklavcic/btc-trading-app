import { INITIAL_EUR_BALANCE } from "../../../store/constants";
import { calculatePnl } from "./calculatePnl";

describe("calculatePnl", () => {
  it("should return 0 when portfolio value equals initial balance", () => {
    expect(calculatePnl(INITIAL_EUR_BALANCE, 0, 50000)).toBe(0);
  });

  it("should return positive PnL when portfolio has profit", () => {
    expect(calculatePnl(5000, 0.1, 60000)).toBe(1000);
  });

  it("should return negative PnL when portfolio has losses", () => {
    expect(calculatePnl(5000, 0.1, 40000)).toBe(-1000);
  });
});
