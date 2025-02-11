"use server";

import { prisma } from "@/prisma";
import { getDaysInMonth } from "date-fns";

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
            getDaysInMonth(currentDate)
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
