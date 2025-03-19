"use server";

import { prisma } from "@/prisma";
import { getResetTokenByEmail } from "../../../forgot-password/_action/getResetTokenByEmail";
import { hashSync } from "bcryptjs";

export const changePassword = async (
  email: string,
  newPassword: string,
  passwordConfirmation: string
) => {
  if (newPassword.length < 6 || passwordConfirmation.length < 6) {
    return {
      message: "Password Minimal 6 karakter",
    };
  }
  if (newPassword !== passwordConfirmation) {
    return {
      message: "Password tidak sama",
    };
  }
  const currentToken = await getResetTokenByEmail(email);
  if (!currentToken) {
    return {
      message: "Link tidak valid",
    };
  }
  if (currentToken.expires.getTime() < new Date().getTime()) {
    return {
      message: "Link sudah kadaluarsa",
    };
  }
  const hashedPassword = hashSync(newPassword);
  await prisma.user.updateMany({
    where: {
      email,
    },
    data: {
      password: hashedPassword,
    },
  });
  await prisma.resetToken.delete({
    where: {
      id: currentToken.id,
    },
  });
};
