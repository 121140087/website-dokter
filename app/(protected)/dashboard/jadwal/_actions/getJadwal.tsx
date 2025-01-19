"use server";

import { prisma } from "@/prisma";

export const getJadwal = async () => {
  return await prisma.jadwal.findMany();
};
