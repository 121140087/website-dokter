"use server";

import { prisma } from "@/prisma";

export const getObat = async (id: string) => {
  const response = prisma.obat.findUnique({
    where: {
      id,
    },
  });
  return response;
};
