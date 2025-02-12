"use server";

import { prisma } from "@/prisma";

export const getPasienByNIK = async (nik: string) => {
  try {
    const response = await prisma.pasien.findUnique({
      where: {
        nik,
      },
    });
    return response;
  } catch (error) {
    return;
  }
};
