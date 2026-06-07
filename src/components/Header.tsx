import { useAppSelector } from "../store/hooks";
import { formatBtc, formatEur } from "../utils/priceFormatters";

const Header = () => {
  const eur = useAppSelector((state) => state.balance.eur);
  const btc = useAppSelector((state) => state.balance.btc);

  return (
    <header className="flex px-6 py-4 justify-between">
      <img src="/bison.svg" alt="Bison" className="w-14 h-13" />
      <div className="flex flex-col items-end sm:flex-row sm:items-center sm:gap-6">
        <span className="text-xs sm:text-sm">Available</span>
        <span className="text-xs sm:text-sm">
          {formatBtc(btc)} <span className="font-semibold">BTC</span>
        </span>
        <span className="text-xs sm:text-sm">
          {formatEur(eur)} <span className="font-semibold">€</span>
        </span>
      </div>
    </header>
  );
};

export default Header;
