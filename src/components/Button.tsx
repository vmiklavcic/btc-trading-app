interface ButtonProps {
  onClick: () => void;
  label: string;
  disabled?: boolean;
  loading?: boolean;
}

const Button = ({ onClick, label, disabled, loading }: ButtonProps) => {
  const stateClass =
    disabled || loading
      ? "bg-button/50 cursor-not-allowed"
      : "bg-button cursor-pointer hover:opacity-85";

  return (
    <button
      disabled={disabled || loading}
      onClick={onClick}
      className={`flex items-center justify-center h-12 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 rounded text-white ${stateClass}`}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        label
      )}
    </button>
  );
};

export default Button;
