"use client";
import { getResepObatThisMonth } from "@/actions/getResepObatThisMonth";
import { format, parse } from "date-fns";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const renderVerticalTick = (props: any) => {
  const { x, y, payload } = props;
  return (
    <text
      x={x}
      y={y}
      transform={`rotate(-70, ${x}, ${y})`}
      textAnchor="end"
      dominantBaseline="middle"
      fontSize={12}
    >
      {payload.value}
    </text>
  );
};

const ResepObatChart = () => {
  const [data, setData] = useState<{ date: string; jumlah: number }[]>([]);

  const updateData = async () => {
    const response = await getResepObatThisMonth();
    const grouped = response.reduce((acc, curr) => {
      const day = format(curr.createdAt, "dd/MM/yyyy");
      acc[day] = (acc[day] || 0) + curr.jumlah;
      return acc;
    }, {} as Record<string, number>);

    const chartData = Object.entries(grouped)
      .map(([date, jumlah]) => ({ date, jumlah }))
      .sort(
        (a, b) =>
          parse(a.date, "dd/MM/yyyy", new Date()).getTime() -
          parse(b.date, "dd/MM/yyyy", new Date()).getTime()
      );

    setData(chartData);
  };

  useEffect(() => {
    updateData();
  }, []);

  return (
    <div className="w-full h-[400px] p-4 mb-16">
      <div className="p-4 rounded border mb-4">
        <p className="font-bold">
          Obat Terjual Bulan {format(new Date(), "MMM")}
        </p>
        <p className="font-bold text-2xl">
          Total {data.reduce((acc, item) => acc + item.jumlah, 0)} Obat
        </p>
      </div>

      <ResponsiveContainer
        width="100%"
        height="100%"
        className="bg-white rounded shadow border z-50"
      >
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            domain={[0, 2]}
            dataKey="date"
            height={80}
            tick={renderVerticalTick}
            label={{
              value: "Tanggal",
              position: "bottom",
              style: { fontSize: 12 },
            }}
          />
          <YAxis
            tickFormatter={(value) =>
              Intl.NumberFormat("id-ID", { minimumFractionDigits: 0 }).format(
                value
              )
            }
            width={80}
            label={{
              value: "Jumlah Obat Terjual",
              angle: -90,
              position: "left",
              offset: 0,

              style: { fontSize: 12 },
            }}
          />
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />

          <Line
            type="monotone"
            dataKey="jumlah"
            stroke="#10b981"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResepObatChart;
