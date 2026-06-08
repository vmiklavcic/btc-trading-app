import { lazy, Suspense, useState } from "react";
import Button from "../../components/Button";
import TransactionHistory from "./TransactionHistory";

const TradeDialog = lazy(() => import("./TradeDialog"));

const Trading = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <Button label="Trade" onClick={() => setIsDialogOpen(true)} />
      <TransactionHistory />
      {isDialogOpen && (
        <Suspense fallback={null}>
          <TradeDialog onClose={() => setIsDialogOpen(false)} />
        </Suspense>
      )}
    </div>
  );
};
export default Trading;
