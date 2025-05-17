"use client";
import { getPemeriksaanThisMonth } from "@/actions/getPemeriksaanThisMonth";
import { format, parse } from "date-fns";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  TooltipProps,
  Legend,
} from "recharts";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";

const PendapatanChart = () => {
  const [data, setData] = useState<{ date: string; jumlah: number }[]>([]);

  const updateData = async () => {
    const response = await getPemeriksaanThisMonth();
    console.log(response)
    const grouped = response.reduce((acc, curr) => {
      const day = format(curr.createdAt, "dd/MM/yyyy");
      acc[day] = (acc[day] || 0) + curr.totalHarga;
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

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded shadow-sm">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-lg font-semibold text-blue-600">
            {Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(payload[0].value as number)}
          </p>
        </div>
      );
    }
    return null;
  };
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

  return (
    <div className="w-full h-[400px] p-4 mb-12">
      <div className="p-4 rounded border mb-4">
        <p className="font-bold">
          Pendapatan Bulan {format(new Date(), "MMM")}
        </p>
        <p className="font-bold text-2xl">
          Total{" "}
          {Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(data.reduce((acc, item) => acc + item.jumlah, 0))}
        </p>
      </div>

      <ResponsiveContainer
        width="100%"
        height="100%"
        className={"rounded border shadow bg-white"}
      >
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            height={80}
            tick={renderVerticalTick}
            tickMargin={10}
            label={{
              value: "Tanggal",
              position: "bottom",
              offset: 0,
              style: { fontSize: 12 },
            }}
          />

          <YAxis
            domain={[0, 2]}
            tickFormatter={(value) =>
              Intl.NumberFormat("id-ID", {
                minimumFractionDigits: 0,
              }).format(value)
            }
            width={80}
            label={{
              value: "Jumlah Pendapatan (Rp)",
              angle: -90,
              position: "left",
              offset: 0,
              style: { fontSize: 12 },
            }}
          />

          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="bottom" height={36} />

          <Line
            type="monotone"
            dataKey="jumlah"
            stroke="#4f46e5" // Tailwind indigo-600
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PendapatanChart;
