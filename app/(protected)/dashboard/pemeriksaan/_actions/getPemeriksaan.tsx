"use server";

import { prisma } from "@/prisma";

export const getPemeriksaan = async () => {
  const response = await prisma.pemeriksaan.findMany();
  return response;
};
