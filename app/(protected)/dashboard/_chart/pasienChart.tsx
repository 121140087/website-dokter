// "use client";
// import {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";
// import { Bar, BarChart, TooltipProps, XAxis, YAxis } from "recharts";
// import {
//   NameType,
//   ValueType,
// } from "recharts/types/component/DefaultTooltipContent";

// const PasienChart = () => {
//   const chartConfig = {
//     value: {
//       label: "Jumlah",
//       color: "#2563eb", // warna biru sesuai tailwind blue-600
//     },
//   };

//   // Custom tooltip agar angka jadi integer
//   const CustomTooltip = ({
//     active,
//     payload,
//     label,
//   }: TooltipProps<ValueType, NameType>) => {
//     if (active && payload && payload.length) {
//       return (
//         <ChartTooltipContent>
//           <p className="text-sm font-medium text-gray-700">{label}</p>
//           <p className="text-lg font-semibold text-blue-600">
//             {Math.round(payload[0].value as number)}
//           </p>
//         </ChartTooltipContent>
//       );
//     }
//     return null;
//   };

//   return (
//     <ChartContainer config={chartConfig} className="w-full">
//       <BarChart data={chartData}>
//         <ChartTooltip content={<CustomTooltip />} />

//         <XAxis
//           dataKey="day"
//           tickLine={false}
//           axisLine={false}
//           tickMargin={10}
//           tickFormatter={(value) => value.slice(0, 3)}
//         />

//         <YAxis
//           tickLine={false}
//           axisLine={false}
//           tickMargin={10}
//           tickFormatter={(value, index) => Math.round(value).toString()}
//         />

//         <Bar dataKey="value" fill="#2563eb" radius={4} />
//       </BarChart>
//     </ChartContainer>
//   );
// };

// export default PasienChart;
