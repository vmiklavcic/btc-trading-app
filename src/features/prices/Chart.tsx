import {
  Area,
  AreaChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  YAxis,
} from "recharts";
import Loading from "../../components/Loading";
import { formatEur } from "../../utils/priceFormatters";
import PrevCloseTick from "./components/PrevCloseTick";
import { useMarketChart } from "./hooks/useMarketChart";
import { getChartTicks } from "./utils/getYAxisTicks";

const Chart = () => {
  const { data, isLoading, isError } = useMarketChart();

  const formattedChartData = data?.map(([timeStamp, price]) => ({
    time: timeStamp,
    price: price,
  }));
  const prevClose = formattedChartData?.[0]?.price;
  const ticks =
    formattedChartData && prevClose
      ? getChartTicks(formattedChartData, prevClose)
      : undefined;

  return (
    <div className="relative w-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loading />
        </div>
      )}
      {isError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-md">
            Unable to load chart data. Please try again later.
          </p>
        </div>
      )}
      <ResponsiveContainer width="100%" height={300} className="select-none">
        <AreaChart data={formattedChartData ?? []}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="var(--color-chart-area)"
                stopOpacity={0.5}
              />
              <stop
                offset="100%"
                stopColor="var(--color-chart-area)"
                stopOpacity={0.05}
              />
            </linearGradient>
          </defs>
          <YAxis
            domain={["auto", "auto"]}
            orientation="right"
            ticks={ticks}
            tick={{ fill: "var(--color-chart-line)", fontSize: 12 }}
            tickFormatter={(value) => formatEur(value as number)}
            axisLine={false}
            tickLine={false}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="var(--color-chart-line)"
            strokeWidth={2}
            fill="url(#colorPrice)"
          />
          <Tooltip
            labelStyle={{ display: "none" }}
            itemStyle={{ color: "white", fontSize: 12 }}
            contentStyle={{
              background: "var(--color-chart-line)",
              border: "none",
              borderRadius: "6px",
            }}
            formatter={(value) => [formatEur(value as number) + " €"]}
          />
          <ReferenceLine
            y={prevClose}
            stroke="var(--color-chart-area)"
            strokeDasharray="1 4"
            label={<PrevCloseTick prevClose={prevClose ?? 0} />}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
