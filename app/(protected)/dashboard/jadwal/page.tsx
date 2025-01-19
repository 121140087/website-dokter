"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useEffect, useState } from "react";
import { getJadwal } from "./_actions/getJadwal";
import { format } from "date-fns";
interface JadwalContent {
  start: string;
  end: string;
  overlap: boolean;
  display: string;
}
const JadwalPage = () => {
  const [jadwal, setJadwal] = useState<JadwalContent[]>([]);
  const updateJadwal = async () => {
    const response = await getJadwal();
    const mapped = response.map((e) => {
      return {
        start: format(e.tanggal, "yyyy-MM-dd"),
        end: format(e.tanggal, "yyyy-MM-dd"),
        overlap: false,
        display: "background",
      };
    });
    setJadwal(mapped);
    console.log(mapped);
  };
  useEffect(() => {
    updateJadwal();
  }, []);
  return (
    <div className="p-4">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={jadwal}
      />
    </div>
  );
};

export default JadwalPage;
