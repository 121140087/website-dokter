"use client";
import { ChartContainer } from "@/components/ui/chart";
import { format, parse } from "date-fns";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getJadwalThisMonth } from "../_actions/getJadwal";

const renderVerticalTick = (props: any) => {
  const { x, y, payload } = props;
  return (
    <text
      x={x}
      y={y}
      transform={`rotate(-90, ${x}, ${y})`}
      textAnchor="end"
      dominantBaseline="middle"
      fontSize={12}
    >
      {payload.value}
    </text>
  );
};
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded border bg-white p-2 shadow">
        <p className="text-sm font-medium">Tanggal: {label}</p>
        <p className="text-xs text-muted-foreground">
          Total Antrian: {payload[0].value}
        </p>
      </div>
    );
  }

  return null;
};

const AntrianChart = () => {
  const [jadwal, setJadwal] = useState<{ date: string; jumlah: number }[]>();
  const chartConfig = {
    jumlahAntrian: {
      label: "value",
      color: "#2563eb",
    },
  };
  const currentDate = new Date();
  const updateJumlahAntrian = async () => {
    const response = await getJadwalThisMonth();
    const grouped = response.reduce((acc, curr) => {
      const day = format(curr.tanggal, "dd/MM/yyyy");
      acc[day] = (acc[day] || 0) + curr._count.Antrian;
      return acc;
    }, {} as Record<string, number>);

    const chartData = Object.entries(grouped)
      .map(([date, jumlah]) => ({ date, jumlah }))
      .sort(
        (a, b) =>
          parse(a.date, "dd/MM/yyyy", new Date()).getTime() -
          parse(b.date, "dd/MM/yyyy", new Date()).getTime()
      );
    setJadwal(chartData);
  };
  useEffect(() => {
    updateJumlahAntrian();
  }, []);
  return (
    <ChartContainer config={chartConfig} className="w-full h-[300px]">
      <BarChart accessibilityLayer data={jadwal}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          height={80}
          tick={renderVerticalTick}
          label={{
            value: "Tanggal",
            position: "bottom",
            offset: 0,
            style: { fontSize: 12 },
          }}
        />
        <YAxis
          domain={[0, 2]}
          tickFormatter={(value) => Math.round(value).toString()}
          width={80}
          label={{
            value: "Jumlah Antrian",
            angle: -90,
            position: "outsideLeft",
            offset: 40,
            style: { fontSize: 12 },
          }}
        />
        <Tooltip />
        <Bar dataKey={"jumlah"} fill="--var(color-value)" radius={4} />
        <Legend verticalAlign="bottom" height={36} />
      </BarChart>
    </ChartContainer>
  );
};

export default AntrianChart;
