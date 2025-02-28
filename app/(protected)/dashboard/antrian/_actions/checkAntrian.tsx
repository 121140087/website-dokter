"use server";

import { prisma } from "@/prisma";
import { createJadwal } from "../../jadwal/_actions/createJadwal";

export const checkAntrian = async (tanggal: Date) => {
  const jamBuka = await prisma.jamBuka.findMany({
    where: {
      key: tanggal.getDay(),
    },
  });
  var maksimalAntrian = 0;
  jamBuka.forEach((j) => {
    maksimalAntrian += j.jumlahAntrian;
  });
  let jadwal = await prisma.jadwal.findFirst({
    where: {
      tanggal: {
        gte: new Date(
          tanggal.getFullYear(),
          tanggal.getMonth(),
          tanggal.getDate(),
          0,
          0,
          0
        ),
        lte: new Date(
          tanggal.getFullYear(),
          tanggal.getMonth(),
          tanggal.getDate(),
          23,
          59,
          59,
          999
        ),
      },
    },
  });
  console.log(jadwal);
  if (!jadwal) {
    jadwal = await createJadwal(tanggal);
  }
  return jadwal?.jumlahAntrian < maksimalAntrian;
};
