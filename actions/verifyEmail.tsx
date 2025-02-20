"use server";

import { prisma } from "@/prisma";

export const verifyEmail = async (token: string) => {
  const verificationToken = await prisma.verificationToken.findFirst({
    where: {
      token,
    },
  });
  if (!verificationToken) {
    return { error: "Email gagal diverifikasi" };
  }
  await prisma.user.updateMany({
    where: {
      email: verificationToken.email,
    },
    data: {
      emailVerified: new Date(),
    },
  });
  await prisma.verificationToken.deleteMany({
    where: {
      email: verificationToken.email,
    },
  });
  return {
    message: "Email berhasil diverifikasi",
  };
};
