"use server";
import { prisma } from "@/prisma";
import { startOfMonth, endOfMonth } from "date-fns";

export const getPemeriksaanThisMonth = async () => {
  const now = new Date();
  const start = startOfMonth(now);
  const end = endOfMonth(now);

  const data = await prisma.pemeriksaan.findMany({
    where: {
      createdAt: {
        gte: start,
        lte: end,
      },
    },
    select: {
      createdAt: true,
      totalHarga: true,
    },
  });
  return data;
};
