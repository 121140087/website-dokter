"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import PasienForm from "./_components/PasienForm";
import { Calendar } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import { checkAntrian } from "../_actions/checkAntrian";
import { toast } from "sonner";

const CreatePasien = () => {
  const [date, setDate] = useState<Date | undefined>();
  const onDateClick = (date: Date) => {
    console.log(date.getDate());
    setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
  };
  if (!date) {
    return (
      <div className="m-4 p-4 rounded shadow-md">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          fixedWeekCount={false}
          height={650}
          validRange={(nowDate) => {
            return {
              start: nowDate,
              end: new Date(nowDate.getTime() + 1000 * 3600 * 24 * 7),
            };
          }}
          dateClick={async (info) => {
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
