"use server";

import { prisma } from "@/prisma";
import { Antrian, StatusAntrian } from "@prisma/client";

export const antrianNext = async (currentAntrian: Antrian | null) => {
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

  const result = await prisma.antrian.findFirst({
    where: {
      createdAt: {
        gte: new Date(),
      },
      statusAntrian: StatusAntrian.MENUNGGU,
    },
    orderBy: {
      noAntrian: "asc",
    },
  });
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
