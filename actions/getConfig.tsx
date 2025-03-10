"use server";

import { prisma } from "@/prisma";

export const getConfig = async (key: string) => {
  const response = await prisma.config.findFirst({
    where: {
      key,
    },
  });
  return response;
};
