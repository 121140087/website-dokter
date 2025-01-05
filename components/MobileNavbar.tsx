import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MobileNavbar = () => {
  const path = usePathname();
  return (
    <div className="absolute top-[72px] left-0 bg-white flex lg:hidden flex-col w-full p-8 gap-y-4">
      <Link href="/" className={cn(path == "/" && "border-b-2")}>
        Home
      </Link>
      <Link href="#">Service</Link>
      <Link href="#">About</Link>
      <Link href="/login" className={buttonVariants()}>
        Masuk
      </Link>
      <Link href="/register" className={buttonVariants({ variant: "outline" })}>
        Daftar
      </Link>
    </div>
  );
};

export default MobileNavbar;
