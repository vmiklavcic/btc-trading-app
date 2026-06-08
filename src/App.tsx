import Header from "./components/Header";
import Chart from "./features/chart/Chart";
import PriceSummary from "./features/price-summary/PriceSummary";
import Trading from "./features/trading/Trading";

function App() {
  return (
    <>
      <Header />
      <div className="flex flex-col mx-auto max-w-5xl px-4 gap-4">
        <PriceSummary />
        <Chart />
        <Trading />
      </div>
    </>
  );
}

export default App;
