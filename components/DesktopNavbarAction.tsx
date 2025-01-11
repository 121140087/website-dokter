"use client";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { useEffect, useState } from "react";
import { auth } from "@/auth";
import { User } from "next-auth";
import { Role } from "@prisma/client";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { logout } from "@/actions/logout";

const DesktopNavbarAction = () => {
  const [user, setUser] = useState<User | undefined>();
  const getUser = async () => {
    const user = await getCurrentUser();
    setUser(user);
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
      {user ? (
        <div className="flex gap-x-4 items-center ml-8">
          <Button onClick={logout} className={buttonVariants()}>
            Logout
          </Button>
          {user.role !== Role.PASIEN && (
            <Link
              href="/dashboard"
              className={buttonVariants({ variant: "outline" })}
            >
              Dashboard
            </Link>
          )}
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
