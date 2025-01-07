"use server";
import { signIn } from "@/auth";
import { loginSchema } from "@/lib/definitions/definitions";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function login(form: z.infer<typeof loginSchema>) {
  try {
    await signIn("credentials", form);
  } catch (error) {
    if (error instanceof AuthError) {
      console.log(error.message);
      switch (error.type) {
        case "CredentialsSignin":
          return "invalid credentials";
        default:
          return "Something went wrong";
      }
    }
    throw error;
  }
}
