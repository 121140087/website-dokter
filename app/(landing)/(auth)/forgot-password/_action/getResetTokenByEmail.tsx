"use server";

import { prisma } from "@/prisma";

export const getResetTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await prisma.resetToken.findFirst({
      where: {
        email: email,
      },
    });
    return verificationToken;
  } catch (error) {
    console.log(error);
  }
};
