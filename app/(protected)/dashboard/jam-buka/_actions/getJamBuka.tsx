"use server";

import { prisma } from "@/prisma";

export const getJamBuka = async () => {
  const response = await prisma.jamBuka.findMany();
  return response;
};
