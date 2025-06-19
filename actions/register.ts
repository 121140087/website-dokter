"use server";
import { registerSchema } from "@/lib/definitions/schemas";
import { prisma } from "@/prisma";
import { z } from "zod";
/* eslint-disable */
// @ts-ignore

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { hashSync } from "bcryptjs";
import { generateVerificationToken } from "./generateVerificationToken";
import { getPasienByNIK } from "./getPasienByNIK";
import { sendVerificationEmail } from "./sendVerificationEmail";

export async function register(form: z.infer<typeof registerSchema>) {
  const { email, nama, nik, password } = form;
  try {
    const userByEmail = await prisma.user.findFirst({
      where: { email },
    });
    if (userByEmail) {
      return {
        message: "Email telah terdaftar",
      };
    }
    const userByNik = await prisma.user.findFirst({
      where: {
        nik,
      },
    });
    if (userByNik) {
      return {
        message: "NIK telah terdaftar",
      };
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.stack);
    }
    if (error instanceof PrismaClientKnownRequestError) {
      console.log(error.code);
    }
  }
  const hashPassword = hashSync(password);

  const payload = {
    email,
    nama,
    nik,
    password: hashPassword,
  };

  try {
    const pasienByNik = await getPasienByNIK(nik);
    if (!pasienByNik) {
      await prisma.pasien.create({
        data: {
          nama,
          nik,
        },
      });
    }
    await prisma.user.create({
      data: payload,
    });
    const verificationToken = await generateVerificationToken(payload.email);
    await sendVerificationEmail(payload.email, verificationToken.token);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    if (error instanceof TypeError) {
      console.log(error.message);
    }
    console.log(error);
  }
}
/* eslint-enable */
