"use server";

import { prisma } from "@/prisma";

export const getPemeriksaanByNIK = async (nik: string) => {
  const response = await prisma.pemeriksaan.findMany({
    where: {
      pasienNik: nik,
    },
  });
  return response;
};
