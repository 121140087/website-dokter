"use server";

import { prisma } from "@/prisma";

export const getPasiens = async () => {
  const response = await prisma.pasien.findMany();
  return response;
};
