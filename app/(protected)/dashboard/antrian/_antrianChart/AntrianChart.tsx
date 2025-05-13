"use client";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { antrianChart } from "@/data/chartData";
import { Antrian, Jadwal } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getJadwalThisMonth } from "../_actions/getJadwal";
import { format } from "date-fns";

interface JadwalData {
  data: number;
  day: number;
}

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
  const [jadwal, setJadwal] = useState<JadwalData[]>();
  const chartConfig = {
    jumlahAntrian: {
      label: "value",
      color: "#2563eb",
    },
  };
  const currentDate = new Date();
  const updateJumlahAntrian = async () => {
    const result = await getJadwalThisMonth();
    const jadwals: JadwalData[] = [];
    for (
      let i = 1;
      i <=
      new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
      i++
    ) {
      jadwals.push({
        data:
          result.find((data) => data.tanggal.getDate() === i)?._count.Antrian ??
          0,
        day: i,
      });
    }
    setJadwal(jadwals);
  };
  useEffect(() => {
    updateJumlahAntrian();
  }, []);
  return (
    <ChartContainer config={chartConfig} className="w-full h-[250px]">
      <BarChart accessibilityLayer data={jadwal}>
        <Tooltip content={<CustomTooltip />} />
        <CartesianGrid strokeDasharray="3 3" />

        <Bar dataKey={"data"} fill="--var(color-value)" radius={4} />
        <YAxis dataKey={"data"}>
          <Label
            value="Jumlah Antrian"
            offset={-5}
            position="left"
            style={{
              textAnchor: "middle",
            }}
            angle={-90}
            fontSize={14}
          />
        </YAxis>
        <XAxis
          dataKey={"day"}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value}
        >
          <Label
            value="Tanggal"
            dy={10}
            position="insideBottom"
            fontSize={14}
          />
        </XAxis>
      </BarChart>
    </ChartContainer>
  );
};

export default AntrianChart;
