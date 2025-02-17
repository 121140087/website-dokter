"use server";

import { prisma } from "@/prisma";

export const deletePemeriksaan = async (id: string) => {
  await prisma.pemeriksaan.delete({
    where: {
      id,
    },
  });
};
