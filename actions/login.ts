"use server";
import { signIn } from "@/auth";
import { getUserByEmail } from "@/lib/actions";
import { loginSchema } from "@/lib/definitions/schemas";
import { prisma } from "@/prisma";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "./sendVerificationEmail";
import { generateVerificationToken } from "./generateVerificationToken";
import { getVerificationTokenByEmail } from "./getVerificationTokenByEmail";
export async function login(form: z.infer<typeof loginSchema>) {
  try {
    const { email, password } = form;
    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
      return {
        error: "Email atau password tidak sesuai",
      };
    }
    const passwordMatch = bcrypt.compareSync(password, existingUser.password);
    if (!passwordMatch) {
      return {
        error: "Email atau password tidak sesuai",
      };
    }
    if (!existingUser.emailVerified) {
      const currentVerificationToken = await getVerificationTokenByEmail(email);
      if (currentVerificationToken) {
        if (currentVerificationToken.expires.getTime() < new Date().getTime()) {
          const verificationToken = await generateVerificationToken(email);
          await sendVerificationEmail(email, verificationToken.token);
        }
      }
      return {
        message: "Silahkan cek email anda untuk memverfikasi akun",
      };
    }
    await signIn("credentials", { email, password, redirect: false });
  } catch (error) {
    if (error instanceof AuthError) {
      console.log(error.message);
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Email atau password tidak sesuai" };
        default:
          return { error: "Terjadi kesalahan" };
      }
    }
    throw error;
  }
}
