"use server";

import { prisma } from "@/prisma";

export const getPaymentStatus = async (id: string) => {
  const pemeriksaan = await prisma.pemeriksaan.findFirst({
    where: {
      id,
    },
  });
  return pemeriksaan?.dibayar;
};
