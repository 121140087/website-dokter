"use server";

import { prisma } from "@/prisma";

export const updatePaymentStatus = async (id: string, payed: boolean) => {
  await prisma.pemeriksaan.update({
    where: {
      id,
    },
    data: {
      dibayar: payed,
    },
  });
};
