import BalanceDisplay from "../features/prices/BalanceDisplay";

const Header = () => {
  return (
    <header className="flex px-6 py-4 justify-between">
      <img src="/bison.svg" alt="Bison" className="w-14 h-13" />
      <BalanceDisplay />
    </header>
  );
};

export default Header;
