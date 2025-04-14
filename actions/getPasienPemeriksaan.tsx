"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";

export const getPasienPemeriksaan = async () => {
  const session = await auth();
  if (!session?.user) {
    return [];
  }

  const pemeriksaan = await prisma.pemeriksaan.findMany({
    where: {
      pasienNik: session.user.nik ?? "",
    },
  });
  return pemeriksaan;
};
