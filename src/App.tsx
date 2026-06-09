import Header from "./components/Header";
import Chart from "./features/prices/Chart";
import PortfolioSummary from "./features/prices/PortfolioSummary";
import Trading from "./features/trading/Trading";

function App() {
  return (
    <>
      <Header />
      <div className="flex flex-col mx-auto max-w-5xl px-4 gap-4">
        <PortfolioSummary />
        <Chart />
        <Trading />
      </div>
    </>
  );
}

export default App;
