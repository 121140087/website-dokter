import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

const DesktopNavbar = () => {
  return (
    <div className="hidden lg:flex gap-x-8 items-center">
      <Link href="/">Home</Link>
      <Link href="#">Service</Link>
      <Link href="#">About</Link>
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
    </div>
  );
};

export default DesktopNavbar;
