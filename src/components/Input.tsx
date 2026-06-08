interface InputProps {
  value: string;
  unit: string;
  onChange: (value: string) => void;
  error?: string;
}

const Input = ({ value, unit, onChange, error }: InputProps) => {
  const stateClass = error
    ? "bg-red-50 border border-red-700"
    : "bg-neutral-200";
  return (
    <div>
      <div
        className={`flex h-12 gap-2 items-center justify-between rounded px-3 transition-colors ${stateClass}`}
      >
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="number-input w-full bg-transparent text-right outline-none border-b border-gray-400"
        />
        <span className="text-xs text-highlight font-bold">{unit}</span>
      </div>
      <p className="text-xs text-red-700 h-4 mt-1">{error}</p>
    </div>
  );
};

export default Input;
