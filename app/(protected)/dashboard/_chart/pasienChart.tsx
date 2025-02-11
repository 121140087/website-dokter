"use client";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { chartData } from "@/data/chartData";
import { Bar, BarChart, XAxis } from "recharts";

const PasienChart = () => {
  const chartConfig = {
    value: {
      label: "value",
      color: "#2563eb",
    },
  };
  return (
    <ChartContainer config={chartConfig} className="w-full">
      <BarChart accessibilityLayer data={chartData}>
        <ChartTooltip content={<ChartTooltipContent />} />

        <Bar dataKey={"value"} fill="--var(color-label)" radius={4} />
        <XAxis
          dataKey={"day"}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
      </BarChart>
    </ChartContainer>
  );
};

export default PasienChart;
