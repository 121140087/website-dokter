"use server";

import { prisma } from "@/prisma";

export const getResetToken = async (token: string) => {
  const response = await prisma.resetToken.findFirst({
    where: {
      token,
    },
  });
  return response;
};
