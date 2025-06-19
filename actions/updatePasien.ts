"use server";

import { prisma } from "@/prisma";

export const updatePasien = async (data: {}, nik: string) => {
  try {
    await prisma.pasien.update({
      where: {
        nik: nik,
      },
      data: data,
    });
  } catch (error) {}
};
