"use server"
import { signIn } from "@/auth";
import { prisma } from "@/prisma";
import { User } from "@prisma/client";
import { AuthError } from "next-auth";
import { z } from "zod";
import { registerSchema } from "./definitions";

export async function getUserByEmail(email: string) : Promise<User | undefined>  {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email : email,
        }
      });
      if (!user) return undefined;
      return user;
    } catch (error) {
      throw new Error("Something went wrong");
    }
  }

