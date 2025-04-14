"use client";
import { getResepObatThisMonth } from "@/actions/getResepObatThisMonth";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ResepObatChart = () => {
  const [data, setData] = useState<{ date: string; jumlah: number }[]>([]);
  const updateData = async () => {
    const response = await getResepObatThisMonth();
    const grouped = response.reduce((acc, curr) => {
      const day = format(curr.createdAt, "dd");
      acc[day] = (acc[day] || 0) + curr.jumlah;
      return acc;
    }, {} as Record<string, number>);

    const chartData = Object.entries(grouped).map(([date, jumlah]) => ({
      date,
      jumlah,
    }));
    setData(chartData);
  };
  useEffect(() => {
    updateData();
  }, []);
  return (
    <div className="w-full h-[300px] p-4 rounded border">
      <div className="p-4 rounded border">
        <p className="font-bold">Obat Terjual Bulan Ini</p>
        <p className="font-bold text-2xl">
          Total {data.reduce((acc, item) => acc + item.jumlah, 0)}
        </p>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="jumlah"
            stroke="#8884d8"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResepObatChart;
