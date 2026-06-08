import Header from "./components/Header";
import Chart from "./features/chart/Chart";
import PriceSummary from "./features/price-summary/PriceSummary";

function App() {
  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto px-4">
        <PriceSummary />
        <Chart />
      </div>
    </>
  );
}

export default App;
