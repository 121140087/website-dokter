"use server";

import { prisma } from "@/prisma";

export const getPasien = async (nik: string) => {
  try {
    return await prisma.pasien.findUnique({
      where: {
        nik,
      },
    });
  } catch (error) {
    return;
  }
};
