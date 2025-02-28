"use server";

import { prisma } from "@/prisma";

export const getJamBuka = async () => {
  const response = await prisma.jamBuka.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
  return response;
};
