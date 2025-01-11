"use server";
import { getUserByEmail } from "@/lib/actions";
import { registerSchema } from "@/lib/definitions/schemas";
import { prisma } from "@/prisma";
import { z } from "zod";
import { hashSync } from "bcryptjs";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { login } from "./login";

export async function register(form: z.infer<typeof registerSchema>) {
  const { email, nama, nik, password } = form;
  try {
    const userByEmail = await prisma.user.findUnique({
      where: { email },
    });
    if (userByEmail) {
      return {
        message: "Email telah terdaftar",
      };
    }
    const userByNik = await prisma.user.findUnique({
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
    await prisma.pasien.create({
      data: {
        nama,
        nik,
      },
    });
    await prisma.user.create({
      data: payload,
    });
    await login({
      email: email,
      password,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    if (error instanceof TypeError) {
      console.log(error.message);
    }
  }
}
