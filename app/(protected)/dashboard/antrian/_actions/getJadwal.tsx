"use server";

import { prisma } from "@/prisma";

export const getJadwalThisMonth = async () => {
  const currentDate = new Date();
  const refDate = new Date(currentDate.getFullYear() - 4);
  try {
    const response = await prisma.jadwal.findMany({
      where: {
        tanggal: {
          gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
          lte: new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            refDate.getDate()
          ),
        },
      },
      orderBy: {
        tanggal: "asc",
      },
      include: {
        _count: {
          select: {
            Antrian: true,
          },
        },
      },
    });
    return response;
  } catch (error) {
    return [];
  }
};
