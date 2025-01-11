"use server";
import { signIn } from "@/auth";
import { loginSchema } from "@/lib/definitions/schemas";
import { prisma } from "@/prisma";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function login(form: z.infer<typeof loginSchema>) {
  try {
    const { email, password } = form;
    await signIn("credentials", { email, password, redirectTo: "/" });
  } catch (error) {
    if (error instanceof AuthError) {
      console.log(error.message);
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "Email atau password tidak sesuai" };
        default:
          return { message: "Terjadi kesalahan" };
      }
    }
    throw error;
  }
}
