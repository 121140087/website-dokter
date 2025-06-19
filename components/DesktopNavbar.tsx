"use client";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { Role } from "@prisma/client";
import { User } from "next-auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import DesktopNavbarAction from "./DesktopNavbarAction";

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
      <DesktopNavbarAction user={user} />
    </div>
  );
};

export default DesktopNavbar;
