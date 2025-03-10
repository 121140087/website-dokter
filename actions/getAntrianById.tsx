"use server";

import { prisma } from "@/prisma";

export const getAntrianById = async (id: string) => {
  const antrian = await prisma.antrian.findFirst({
    where: {
      id,
    },
    include: {
      jadwal: true,
    },
  });
  return antrian;
};
