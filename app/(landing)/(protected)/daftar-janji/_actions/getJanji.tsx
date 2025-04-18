"use server";

import { getCurrentUser } from "@/actions/getCurrentUser";
import { prisma } from "@/prisma";

export const getJanji = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return [];
  }
  const janji = await prisma.antrian.findMany({
    where: {
      pasienNIK: user.nik!,
    },
    include: {
      jadwal: true,
    },
  });
  return janji;
};
