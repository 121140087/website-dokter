"use server";

import { prisma } from "@/prisma";
import { StatusAntrian } from "@prisma/client";

export const getCurrentAntrian = async () => {
  const date = new Date();
  let responseJadwal = await prisma.jadwal.findFirst({
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
  if (!responseJadwal) {
    return null;
  }
  let response = await prisma.antrian.findFirst({
    where: {
      jadwalId: responseJadwal.id,
      statusAntrian: StatusAntrian.SEDANG_DIPERIKSA,
    },
    orderBy: {
      noAntrian: "asc",
    },
  });

  return response;
};
