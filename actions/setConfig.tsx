"use server";

import { prisma } from "@/prisma";

export const setConfig = async (key: string, value: string) => {
  await prisma.config.updateMany({
    where: {
      key,
    },
    data: {
      value,
    },
  });
};
