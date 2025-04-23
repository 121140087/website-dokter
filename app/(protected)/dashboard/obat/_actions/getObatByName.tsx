"use server";

import { prisma } from "@/prisma";

export const getObatByName = async (nama: string) => {
  const response = await prisma.obat.findFirst({
    where: {
      nama: nama,
    },
  });
  return response;
};
