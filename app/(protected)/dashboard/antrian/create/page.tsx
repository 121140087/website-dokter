"use client";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { StatusKlinik } from "@prisma/client";
import { format } from "date-fns";
import { SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";
import { getJadwal } from "../../jadwal/_actions/getJadwal";
import { checkAntrian } from "../_actions/checkAntrian";
import PasienForm from "./_components/PasienForm";
interface JadwalContent {
  start: string;
  end: string;
  overlap: boolean;
  display: string;
}
const CreatePasien = () => {
  const [date, setDate] = useState<Date | undefined>();
  const [jadwal, setJadwal] = useState<JadwalContent[]>([]);

  const onDateClick = (date: Date) => {
    setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
  };

  const updateJadwal = async () => {
    const response = await getJadwal();

    const mapped: SetStateAction<JadwalContent[]> = [];
    response.forEach((e) => {
      if (e.statusKlinik != StatusKlinik.BUKA) {
        mapped.push({
          start: format(e.tanggal, "yyyy-MM-dd"),
          end: format(e.tanggal, "yyyy-MM-dd"),
          overlap: false,
          display: "background",
        });
      }
    });
    setJadwal(mapped);
  };
  useEffect(() => {
    updateJadwal();
  }, []);
  if (!date) {
    return (
      <div className="m-4 p-4 rounded shadow-md">
        <div className="flex flex-wrap w-full gap-x-2 p-4 rounded border m-4">
          <div className="h-12 w-32 bg-calendar-closed  border-slate-300 flex justify-center items-center">
            Tutup
          </div>
          <div className="h-12 w-32 bg-calendar-today-closed  border-slate-300 flex justify-center items-center">
            Tutup hari ini
          </div>
          <div className="h-12 w-32 bg-calendar-today border-slate-300 flex justify-center items-center">
            hari ini
          </div>
          <div className="h-12 w-32 border border-slate-300 flex justify-center items-center">
            buka
          </div>
          <div className="h-12 w-32 border bg-calendar-disabled border-slate-300  flex justify-center items-center">
            Bukan Opsi
          </div>
        </div>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          fixedWeekCount={false}
          height={650}
          events={jadwal}
          validRange={(nowDate) => {
            return {
              start: new Date(),
              end: new Date(new Date().getTime() + 1000 * 3600 * 24 * 7),
            };
          }}
          dateClick={async (info) => {
            if (
              jadwal.findIndex(
                (j) => j.start === format(info.date, "yyyy-MM-dd")
              ) !== -1
            ) {
              toast(
                "Klinik Tutup pada tanggal " + format(info.date, "yyyy-MM-dd")
              );
              return;
            }
            const result = await checkAntrian(info.date);
            if (result) {
              onDateClick(info.date);
            } else {
              toast("Antrian Penuh");
            }
          }}
        />
      </div>
    );
  }
  return (
    <div className="p-4 flex gap-x-4">
      <PasienForm date={date} />
    </div>
  );
};

export default CreatePasien;
