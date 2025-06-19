"use client";
import { logout } from "@/actions/logout";
import { Role } from "@prisma/client";
import { User } from "next-auth";
import Link from "next/link";
import { toast } from "sonner";
import { Button, buttonVariants } from "./ui/button";

const MobileNavbarAction = ({ user }: { user: User | undefined }) => {
  const signOut = async () => {
    await logout();
    toast("Berhasil Logout");
    window.location.reload();
  };
  return (
    <div className="flex flex-col gap-y-4">
      {user ? (
        <>
          {user.role === Role.PASIEN && (
            <Link
              href="/daftar-janji"
              className={buttonVariants({ variant: "outline" })}
            >
              Janji Saya
            </Link>
          )}
          <Button onClick={signOut}>Keluar</Button>
        </>
      ) : (
        <>
          <Link href="/login" className={buttonVariants()}>
            Masuk
          </Link>
          <Link
            href="/register"
            className={buttonVariants({ variant: "outline" })}
          >
            Daftar
          </Link>
        </>
      )}
    </div>
  );
};

export default MobileNavbarAction;
