"use server";

import { prisma } from "@/prisma";

export const getJadwalThisMonth = async () => {
  const currentDate = new Date();
  try {
    const response = await prisma.jadwal.findMany({
      where: {
        tanggal: {
          lte: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
          gte: new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0
          ),
        },
      },
    });
    return response;
  } catch (error) {
    return [];
  }
};
