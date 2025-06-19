"use server";
import { prisma } from "@/prisma";
import { endOfMonth, startOfMonth } from "date-fns";

export const getResepObatThisMonth = async () => {
  const now = new Date();
  const start = startOfMonth(now);
  const end = endOfMonth(now);

  const data = await prisma.resepObat.findMany({
    where: {
      createdAt: {
        gte: start,
        lte: end,
      },
    },
    select: {
      createdAt: true,
      jumlah: true,
    },
  });
  return data;
};
