"use client";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { antrianChart } from "@/data/chartData";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

const AntrianChart = () => {
  const chartConfig = {
    value: {
      label: "value",
      color: "#2563eb",
    },
  };
  return (
    <ChartContainer config={chartConfig} className="w-full h-[250px]">
      <BarChart accessibilityLayer data={antrianChart}>
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey={"value"} fill="--var(color-value)" radius={4} />
        <YAxis />
        <XAxis
          dataKey={"day"}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value}
        />
      </BarChart>
    </ChartContainer>
  );
};

export default AntrianChart;
