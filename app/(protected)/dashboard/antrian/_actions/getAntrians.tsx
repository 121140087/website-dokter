"use server";

import { prisma } from "@/prisma";

export const getAntrians = async () => {
  try {
    const response = await prisma.antrian.findMany();
    return response;
  } catch (error) {
    return [];
  }
};
