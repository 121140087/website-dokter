"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

import { SetStateAction, useEffect, useState } from "react";
import { getJadwal } from "./_actions/getJadwal";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { closeDate } from "./_actions/closeDate";
import { toast } from "sonner";
import { StatusKlinik } from "@prisma/client";
interface JadwalContent {
  start: string;
  end: string;
  overlap: boolean;
  display: string;
}
const JadwalPage = () => {
  const [jadwal, setJadwal] = useState<JadwalContent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
  const openDialog = () => {
    setIsDialogOpen(true);
  };
  const setClosedDate = async () => {
    if (selectedDate) {
      toast("Update kalender");
      await closeDate(selectedDate);
      toast("Berhasil mengupdate kalender");
      setIsDialogOpen(false);
      window.location.reload();
    }
  };
  useEffect(() => {
    updateJadwal();
  }, []);
  return (
    <div className="p-4">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={jadwal}
        validRange={(nowDate) => {
          return {
            start: new Date(),
            end: new Date(new Date().getTime() + 1000 * 3600 * 24 * 7),
          };
        }}
        dateClick={(info) => {
          setSelectedDate(info.date);
          console.log(info);
          console.log(selectedDate);
          openDialog();
        }}
      />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Apakah anda yakin{" "}
              {selectedDate &&
              jadwal.findIndex(
                (v) => v.start === format(selectedDate, "yyyy-MM-dd")
              ) !== -1
                ? "Buka"
                : "Tutup"}{" "}
              di tanggal {selectedDate && format(selectedDate, "dd MMM yyyy")} ?
            </DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={setClosedDate}>Konfirmasi</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JadwalPage;
