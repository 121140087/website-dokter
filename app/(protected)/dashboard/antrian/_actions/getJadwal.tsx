"use server";

import { prisma } from "@/prisma";

export const getJadwalThisMonth = async () => {
  const currentDate = new Date();
  try {
    const response = await prisma.jadwal.findMany({
      where: {
        tanggal: {
          gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
          lte: new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate()
          ),
        },
      },
      orderBy: {
        tanggal: "asc",
      },
    });
    return response;
  } catch (error) {
    return [];
  }
};
