"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
const JadwalPage = () => {
  return (
    <div className="p-4">
      <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
    </div>
  );
};

export default JadwalPage;
