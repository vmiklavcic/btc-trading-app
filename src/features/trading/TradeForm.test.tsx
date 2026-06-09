import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { useLatestMarketPrice } from "../../hooks/useLatestMarketPrice";
import balanceReducer from "../../store/balanceSlice";
import TradeForm from "./TradeForm";

jest.mock("../../hooks/useLatestMarketPrice", () => ({
  useLatestMarketPrice: jest.fn(),
}));

const mockUseLatestMarketPrice = useLatestMarketPrice as jest.Mock;

const mockRefetch = jest.fn();

beforeEach(() => {
  mockRefetch.mockResolvedValue({ data: 50000, isError: false });
  mockUseLatestMarketPrice.mockReturnValue({
    data: 50000,
    isLoading: false,
    isError: false,
    refetch: mockRefetch,
  } as unknown as ReturnType<typeof useLatestMarketPrice>);
});

afterEach(() => {
  jest.clearAllMocks();
});

const renderTradeForm = (eurBalance = 10000, btcBalance = 1) => {
  const store = configureStore({
    reducer: { balance: balanceReducer },
    preloadedState: {
      balance: { eur: eurBalance, btc: btcBalance },
    },
  });
  const onClose = jest.fn();
  render(
    <Provider store={store}>
      <TradeForm onClose={onClose} />
    </Provider>,
  );
  return { onClose, store };
};

describe("TradeForm", () => {
  describe("loading and error states", () => {
    it("should hide the form while the price is loading", () => {
      mockUseLatestMarketPrice.mockReturnValue({
        data: undefined,
        isLoading: true,
        isError: false,
        refetch: mockRefetch,
      } as unknown as ReturnType<typeof useLatestMarketPrice>);

      renderTradeForm();

      expect(screen.queryByRole("button", { name: "Buy" })).not.toBeInTheDocument();
    });

    it("should show an error message when the price fails to load", () => {
      mockUseLatestMarketPrice.mockReturnValue({
        data: undefined,
        isLoading: false,
        isError: true,
        refetch: mockRefetch,
      } as unknown as ReturnType<typeof useLatestMarketPrice>);

      renderTradeForm();

      screen.getByText(/Unable to load the latest price/);
    });
  });

  describe("buy validation", () => {
    it("should show an error when EUR input is empty and user submits the form", () => {
      renderTradeForm();

      fireEvent.click(screen.getByRole("button", { name: "Buy" }));

      screen.getByText("Amount is required");
    });

    it("should show an error when EUR amount exceeds balance and user submits the form", () => {
      renderTradeForm(500);

      const [eurInput] = screen.getAllByRole("spinbutton");
      fireEvent.change(eurInput, { target: { value: "1000" } });
      fireEvent.click(screen.getByRole("button", { name: "Buy" }));

      screen.getByText("Not enough balance");
    });
  });

  describe("sell validation", () => {
    it("should show an error when BTC input is empty", () => {
      renderTradeForm();

      fireEvent.click(screen.getByRole("button", { name: "Sell" }));

      screen.getByText("Amount is required");
    });

    it("should show an error when BTC amount exceeds balance", () => {
      renderTradeForm(10000, 0.1);

      const [, btcInput] = screen.getAllByRole("spinbutton");
      fireEvent.change(btcInput, { target: { value: "0.5" } });
      fireEvent.click(screen.getByRole("button", { name: "Sell" }));

      screen.getByText("Not enough balance");
    });
  });

  describe("successful trades", () => {
    it("should dispatch a buy action and closes the form", async () => {
      const { onClose, store } = renderTradeForm();
      const dispatchSpy = jest.spyOn(store, "dispatch");

      const [eurInput] = screen.getAllByRole("spinbutton");
      fireEvent.change(eurInput, { target: { value: "1000" } });
      fireEvent.click(screen.getByRole("button", { name: "Buy" }));

      await waitFor(() => {
        expect(dispatchSpy).toHaveBeenCalledWith(
          expect.objectContaining({ type: "balance/buy" }),
        );
      });
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("should dispatch a sell action and closes the form", async () => {
      const { onClose, store } = renderTradeForm(10000, 1);
      const dispatchSpy = jest.spyOn(store, "dispatch");

      const [, btcInput] = screen.getAllByRole("spinbutton");
      fireEvent.change(btcInput, { target: { value: "0.5" } });
      fireEvent.click(screen.getByRole("button", { name: "Sell" }));

      await waitFor(() => {
        expect(dispatchSpy).toHaveBeenCalledWith(
          expect.objectContaining({ type: "balance/sell" }),
        );
      });
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
