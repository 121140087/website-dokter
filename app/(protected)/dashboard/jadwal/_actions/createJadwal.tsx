"use server";

import { prisma } from "@/prisma";
import { StatusKlinik } from "@prisma/client";

export const createJadwal = async (date: Date) => {
  return await prisma.jadwal.create({
    data: {
      jumlahAntrian: 0,
      statusKlinik: StatusKlinik.BUKA,
      tanggal: date,
    },
  });
};
