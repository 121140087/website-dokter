"use server";

import { prisma } from "@/prisma";

export const deletePasien = async (nik: string) => {
  await prisma.pasien.delete({
    where: {
      nik,
    },
  });
};
