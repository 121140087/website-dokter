"use server";
import { prisma } from "@/prisma";
import { v4 as uuidv4 } from "uuid";
import { getResetTokenByEmail } from "./getResetTokenByEmail";

export const generateResetPasswordToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date().getTime() + 1000 * 60 * 60;

  const existingToken = await getResetTokenByEmail(email);
  if (existingToken) {
    await prisma.resetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  const verificationToken = await prisma.resetToken.create({
    data: {
      email,
      token,
      expires: new Date(expires),
    },
  });
  return verificationToken;
};
