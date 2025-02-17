"use server";

import { prisma } from "@/prisma";

export const getUserById = async (id: string) => {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
  });
  return user;
};
