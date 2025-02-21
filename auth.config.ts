import { Role } from "@prisma/client";
import type { NextAuthConfig } from "next-auth";
import { PrismaClient } from "@prisma/client/edge";
import { getUserByEmail } from "./lib/actions";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const adminRoutes = ["/dashboard"];
      const protectedRoutes = [
        "/pasien/create/",
        "/buat-janji",
        "/pemeriksaan",
        "/antrian",
      ];
      const authenticationRoutes = ["/login", "/register"];
      const isOnProtectedRoutes = protectedRoutes.includes(nextUrl.pathname);
      const isOnAdminRoutes = adminRoutes.includes(nextUrl.pathname);
      const isOnAuthenticationRoutes = authenticationRoutes.includes(
        nextUrl.pathname
      );
      const isPasien = auth?.user?.role === Role.PASIEN;
      if (isOnProtectedRoutes && !isLoggedIn) {
        return false;
      }
      if (isOnAdminRoutes && !isLoggedIn) {
        return false;
      }
      if (isOnAdminRoutes && isPasien) {
        return false;
      }
      if (isOnAuthenticationRoutes && isLoggedIn && !isPasien) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      if (isOnAuthenticationRoutes && isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.name = user.nama;
        token.nik = user.nik!;
        token.dokterId = user.dokterId;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.name = token.name;
      session.user.nik = token.nik;
      session.user.dokterId = token.dokterId;
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
