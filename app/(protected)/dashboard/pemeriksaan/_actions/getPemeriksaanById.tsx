"use server";

import { prisma } from "@/prisma";

export const getPemeriksaanById = async (id: string) => {
  const pemeriksaan = await prisma.pemeriksaan.findFirst({
    where: {
      id,
    },
    include: {
      pasien: true,
      dokter: true,
      resepObat: {
        include: { obat: true },
      },
    },
  });
  return pemeriksaan;
};
