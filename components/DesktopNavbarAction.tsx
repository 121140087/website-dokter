"use client";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { useEffect, useState } from "react";
import { User } from "next-auth";
import { Role } from "@prisma/client";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { logout } from "@/actions/logout";
import { toast } from "sonner";

const DesktopNavbarAction = ({ user }: { user: User | undefined }) => {
  const signOut = async () => {
    await logout();
    toast("Berhasil Logout");
    window.location.reload();
  };

  return (
    <div>
      {user ? (
        <div className="flex gap-x-4 items-center ml-8">
          {user.role !== Role.PASIEN && (
            <Link
              href="/dashboard"
              className={buttonVariants({ variant: "outline" })}
            >
              Dashboard
            </Link>
          )}

          <Button onClick={signOut}>Keluar</Button>
        </div>
      ) : (
        <div className="flex gap-x-4 items-center ml-8">
          <Link href="/login" className={buttonVariants()}>
            Masuk
          </Link>
          <Link
            href="/register"
            className={buttonVariants({ variant: "outline" })}
          >
            Daftar
          </Link>
        </div>
      )}
    </div>
  );
};

export default DesktopNavbarAction;
