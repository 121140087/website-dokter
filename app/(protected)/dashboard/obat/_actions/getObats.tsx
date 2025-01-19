"use server";

import { prisma } from "@/prisma";
export const getObats = async () => {
  try {
    const obats = prisma.obat.findMany({
      orderBy: {
        stok: "asc",
      },
    });
    return obats;
  } catch (error) {
    return [];
  }
};
