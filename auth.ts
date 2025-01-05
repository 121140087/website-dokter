
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma"

import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod";
import { getUserByEmail } from "./lib/actions"
import bcrypt from 'bcryptjs';


export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [Credentials({
    async authorize(credentials) {
        const parsedCredentials = z.object({email: z.string().email(),password : z.string().min(6)}).safeParse(credentials);
        if (parsedCredentials.success) {
          const {email, password} = parsedCredentials.data;
          const user = await getUserByEmail(email);
          if (!user) return null;
          const passwordMatch = await bcrypt.compare(password,user.password);
          if (passwordMatch) return user;
        }
        return null;
    },
  }),]
});