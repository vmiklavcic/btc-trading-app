import { formatEur } from "../../../utils/priceFormatters";
/**
 * This component contains many magic numbers needed to position the tick correctly
 */
const PrevCloseTick = ({
  viewBox,
  prevClose,
}: {
  viewBox?: { x: number; y: number; width: number };
  prevClose: number;
}) => {
  if (!viewBox || !prevClose) return null;
  const { x, y, width } = viewBox;

  return (
    <g>
      <rect
        x={x + width - 55}
        y={y - 10}
        width={120}
        height={20}
        fill="var(--color-chart-area)"
        rx={3}
      />
      <text x={x + width - 50} y={y + 4} fill="white" fontSize={11}>
        Prev close
      </text>
      <text x={x + width + 8} y={y + 4} fill="white" fontSize={12}>
        {formatEur(prevClose)}
      </text>
    </g>
  );
};

export default PrevCloseTick;
