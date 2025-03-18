"use server";

import { prisma } from "@/prisma";
import { StatusKlinik } from "@prisma/client";

export const closeDate = async (date: Date) => {
  const jadwal = await prisma.jadwal.findFirst({
    where: {
      tanggal: {
        gte: new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          0,
          0,
          0
        ),
        lte: new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          23,
          59,
          59,
          999
        ),
      },
    },
  });
  if (jadwal) {
    await prisma.jadwal.update({
      where: {
        id: jadwal.id,
      },
      data: {
        statusKlinik:
          jadwal.statusKlinik == StatusKlinik.TUTUP
            ? StatusKlinik.BUKA
            : StatusKlinik.TUTUP,
      },
    });
  } else {
    await prisma.jadwal.create({
      data: {
        jumlahAntrian: 0,
        statusKlinik: StatusKlinik.TUTUP,
        tanggal: date,
      },
    });
  }
};
