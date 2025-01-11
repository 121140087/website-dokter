import { Role } from "@prisma/client";
import { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"];
  }
  interface User {
    role: Role;
    nama: string;
    nik: string;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    sub: string;
    role: Role;
    nik: string;
  }
}
