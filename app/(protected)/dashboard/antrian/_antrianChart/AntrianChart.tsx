"use client";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { antrianChart } from "@/data/chartData";
import { Antrian, Jadwal } from "@prisma/client";
import { useEffect, useState } from "react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { getJadwalThisMonth } from "../_actions/getJadwal";
import { format } from "date-fns";

interface JadwalData {
  data: number;
  day: number;
}

const AntrianChart = () => {
  const [loading, setLoading] = useState(true);
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
          result.find((data) => data.tanggal.getDay() === i)?.jumlahAntrian ??
          0,
        day: i,
      });
    }
    console.log(result);
    setJadwal(jadwals);
  };
  useEffect(() => {
    updateJumlahAntrian();
  }, []);
  return (
    <ChartContainer config={chartConfig} className="w-full h-[250px]">
      <BarChart accessibilityLayer data={jadwal}>
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey={"data"} fill="--var(color-value)" radius={4} />
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
