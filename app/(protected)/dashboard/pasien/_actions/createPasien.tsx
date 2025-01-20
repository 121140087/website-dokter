"use server";

import { prisma } from "@/prisma";
import { Pasien } from "@prisma/client";

export const createPasien = async (pasien: Pasien) => {
  await prisma.pasien.create({
    data: pasien,
  });
};
