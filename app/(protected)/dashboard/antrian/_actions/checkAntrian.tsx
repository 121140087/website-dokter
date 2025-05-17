"use server";

import { prisma } from "@/prisma";
import { createJadwal } from "../../jadwal/_actions/createJadwal";
import { endOfDay, endOfMonth, startOfDay, startOfMonth } from "date-fns";

export const checkAntrian = async (tanggal: Date) => {
    const now = new Date();
    const start = startOfDay(now);
    const end = endOfDay(now);
  
  const jamBuka = await prisma.jamBuka.findMany({
    where: {
      key: tanggal.getDay() === 0 ? 7 : tanggal.getDay() + 1,
    },
  });
  var maksimalAntrian = 0;
  jamBuka.forEach((j) => {
    maksimalAntrian += j.jumlahAntrian;
  });
  let jadwal = await prisma.jadwal.findFirst({
    where: {
      tanggal: {
        gte: start,
        lte: end,
      },
    },
  });
  console.log(jadwal);
  if (!jadwal) {
    jadwal = await createJadwal(tanggal);
    
  }
  return jadwal?.jumlahAntrian < maksimalAntrian;
};
