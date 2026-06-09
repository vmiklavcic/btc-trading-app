import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import balanceReducer from "../../store/balanceSlice";
import { formatBtc, formatEur } from "../../utils/priceFormatters";
import BalanceDisplay from "./BalanceDisplay";

const renderWithStore = (eur: number, btc: number) => {
  const store = configureStore({
    reducer: { balance: balanceReducer },
    preloadedState: { balance: { eur, btc } },
  });
  return render(
    <Provider store={store}>
      <BalanceDisplay />
    </Provider>,
  );
};

describe("BalanceDisplay", () => {
  it("should render the EUR balance", () => {
    renderWithStore(5000, 0);
    expect(screen.getByText(formatEur(5000))).toBeInTheDocument();
  });

  it("should render the BTC balance", () => {
    renderWithStore(0, 0.5);
    expect(screen.getByText(formatBtc(0.5))).toBeInTheDocument();
  });

  it("should render zero balances", () => {
    renderWithStore(0, 0);
    expect(screen.getByText(formatEur(0))).toBeInTheDocument();
    expect(screen.getByText(formatBtc(0))).toBeInTheDocument();
  });

  it("should render the BTC and EUR currency labels", () => {
    renderWithStore(10000, 0);
    expect(screen.getByText("BTC")).toBeInTheDocument();
    expect(screen.getByText("€")).toBeInTheDocument();
  });
});
