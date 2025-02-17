"use server";

import { prisma } from "@/prisma";
import { Antrian, StatusAntrian } from "@prisma/client";

export const antrianNext = async (currentAntrian: Antrian | null) => {
  const currentDate = new Date();
  if (currentAntrian) {
    const response = await prisma.antrian.findUnique({
      where: {
        id: currentAntrian.id,
      },
    });
    if (response?.statusAntrian == StatusAntrian.SEDANG_DIPERIKSA) {
      return {
        message: "Sedang ada pemeriksaan",
        data: undefined,
      };
    }
  }
  const res = await prisma.jadwal.findFirst({
    where: {
      tanggal: {
        gte: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate()
        ),
        lte: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate()
        ),
      },
    },
    include: {
      Antrian: {
        where: {
          statusAntrian: StatusAntrian.MENUNGGU,
        },
      },
    },
  });
  const result = res?.Antrian[0];
  if (result) {
    await prisma.antrian.update({
      where: {
        id: result?.id,
      },
      data: {
        statusAntrian: StatusAntrian.SEDANG_DIPERIKSA,
      },
    });
    return {
      message: undefined,
      data: result,
    };
  }
  return {
    message: "Tidak ada Antrian lagi",
    data: undefined,
  };
};
