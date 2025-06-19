import { getCurrentUser } from "@/actions/getCurrentUser";
import { cn } from "@/lib/utils";
import { Role } from "@prisma/client";
import { User } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import MobileNavbarAction from "./MobileNavbarAction";

const MobileNavbar = () => {
  const path = usePathname();
  const [user, setUser] = useState<User | undefined>();
  const getUser = async () => {
    const user = await getCurrentUser();
    setUser(user);
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="absolute top-[72px] left-0 bg-white flex lg:hidden flex-col w-full p-8 gap-y-4">
      <Link href="/" className={cn(path == "/" && "border-b-2")}>
        Home
      </Link>
      {user?.role === Role.PASIEN && (
        <>
          <Link
            href="/daftar-janji"
            className={cn(path == "/" && "border-b-2")}
          >
            Janji Saya
          </Link>
          <Link href="/pemeriksaan" className={cn(path == "/" && "border-b-2")}>
            Hasil Pemeriksaan
          </Link>
        </>
      )}
      <MobileNavbarAction user={user} />
    </div>
  );
};

export default MobileNavbar;
