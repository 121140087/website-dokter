"use server";

import { prisma } from "@/prisma";

export const getLastPemeriksaanByNIK = async (nik: string) => {
  const pemeriksaan = await prisma.pemeriksaan.findFirst({
    where: {
      pasienNik: nik,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return pemeriksaan;
};
