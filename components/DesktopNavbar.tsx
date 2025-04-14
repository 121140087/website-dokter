"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { auth } from "@/auth";
import { Role } from "@prisma/client";
import { useEffect, useState } from "react";
import { User } from "next-auth";
import DesktopNavbarAction from "./DesktopNavbarAction";
import { getCurrentUser } from "@/actions/getCurrentUser";

const DesktopNavbar = () => {
  const [user, setUser] = useState<User | undefined>();
  const getUser = async () => {
    const user = await getCurrentUser();
    setUser(user);
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="hidden lg:flex gap-x-8 items-center">
      <Link href="/">Beranda</Link>
      {user?.role === Role.PASIEN && (
        <>
          <Link href="/daftar-janji">Janji Saya</Link>
          <Link href="/pemeriksaan">Hasil Pemeriksaan</Link>
        </>
      )}
      <DesktopNavbarAction />
    </div>
  );
};

export default DesktopNavbar;
