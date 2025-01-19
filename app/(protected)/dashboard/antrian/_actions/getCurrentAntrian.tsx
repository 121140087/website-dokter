"use server";

import { prisma } from "@/prisma";
import { StatusAntrian } from "@prisma/client";

export const getCurrentAntrian = async () => {
  let response = await prisma.antrian.findFirst({
    where: {
      createdAt: {
        gte: new Date(),
      },
      statusAntrian: StatusAntrian.SEDANG_DIPERIKSA,
    },
    orderBy: {
      noAntrian: "asc",
    },
  });

  return response;
};
