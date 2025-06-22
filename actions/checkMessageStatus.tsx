"use server";

import { prisma } from "@/prisma";
import { Role } from "@prisma/client";

export const checkMessageStatus = async () => {
  const dokter = await prisma.user.findFirst({
    where: {
      role: Role.DOKTER,
    },
  });
  return dokter?.enableMessage ?? false;
};
