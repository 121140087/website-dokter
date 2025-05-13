"use server";

import { prisma } from "@/prisma";

export const getPemeriksaanByNIK = async (nik: string) => {
  const result = await prisma.pemeriksaan.findMany({
    where: {
      pasienNik: nik,
    },
  });
  return result;
};
