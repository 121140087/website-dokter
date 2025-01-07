"use server";
import { getUserByEmail } from "@/lib/actions";
import { registerSchema } from "@/lib/definitions/definitions";
import { prisma } from "@/prisma";
import { z } from "zod";

export async function register(form: z.infer<typeof registerSchema>) {
  const user = await getUserByEmail(form.email);
  if (user) throw new Error("Akun telah terdaftar");
  await prisma.user.create({
    data: form,
  });
}
