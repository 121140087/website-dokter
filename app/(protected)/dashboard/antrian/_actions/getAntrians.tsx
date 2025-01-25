"use server";

import { prisma } from "@/prisma";

export const getAntrians = async () => {
  const currentDate = new Date();

  try {
    const response = await prisma.jadwal.findFirst({
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
          orderBy: {
            noAntrian: "asc",
          },
        },
      },
    });
    return response?.Antrian ?? [];
  } catch (error) {
    return [];
  }
};
