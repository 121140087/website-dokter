"use server";

import { prisma } from "@/prisma";
import { StatusAntrian } from "@prisma/client";

export const getCurrentAntrian = async () => {
  const currentDate = new Date();

  let response = await prisma.antrian.findFirst({
    where: {
      createdAt: {
        gte: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate()
        ),
        lte: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() + 1
        ),
      },
      statusAntrian: StatusAntrian.SEDANG_DIPERIKSA,
    },
    orderBy: {
      noAntrian: "asc",
    },
  });

  return response;
};
