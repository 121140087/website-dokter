"use client";

import { getJamBuka } from "@/app/(protected)/dashboard/jam-buka/_actions/getJamBuka";
import { Skeleton } from "@/components/ui/skeleton";
import { JamBuka } from "@prisma/client";
import { CalendarDays, Clock, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

const hari = [
  { name: "Senin", key: 1 },
  { name: "Selasa", key: 2 },
  { name: "Rabu", key: 3 },
  { name: "Kamis", key: 4 },
  { name: "Jumat", key: 5 },
  { name: "Sabtu", key: 6 },
  { name: "Minggu", key: 7 },
];

// Mengubah hari sekarang ke key format (1-7, Senin = 1)
const getTodayKey = () => {
  const jsDay = new Date().getDay(); // Minggu = 0
  return jsDay === 0 ? 7 : jsDay;
};

const JamPraktik = () => {
  const [jamBuka, setJamBuka] = useState<JamBuka[] | null>(null);
  const todayKey = getTodayKey();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getJamBuka();
      setJamBuka(response);
    };
    fetchData();
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 my-12">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-primary">
        Jam Praktik
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hari.map((h) => {
          const jamHariIni = jamBuka?.filter((j) => j.key === h.key);

          const isToday = h.key === todayKey;

          return (
            <div
              key={h.key}
              className={`rounded-2xl border p-5 shadow-sm transition-all bg-white relative ${
                isToday ? "border-blue-500 bg-blue-50" : "hover:shadow-md"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-gray-500" />
                  <h3 className="text-lg font-semibold text-gray-700">
                    {h.name}
                  </h3>
                </div>

                {isToday && (
                  <span className="text-sm bg-blue-500 text-white px-3 py-1 rounded-full">
                    Hari Ini
                  </span>
                )}
              </div>

              {jamBuka === null ? (
                <Skeleton className="h-5 w-32" />
              ) : jamHariIni && jamHariIni.length > 0 ? (
                <div className="space-y-2">
                  {jamHariIni.map((j) => (
                    <div
                      key={j.id}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <Clock className="w-4 h-4 text-green-500" />
                      <span>
                        {j.startTime} - {j.endTime}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-500 mt-2">
                  <XCircle className="w-5 h-5" />
                  <span>Tutup</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JamPraktik;
