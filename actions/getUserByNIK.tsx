"use server";

import { prisma } from "@/prisma";

export const getUserByNIK = async (nik: string) => {
  const user = await prisma.user.findFirst({
    where: {
      nik: nik,
    },
  });
  return user;
};
