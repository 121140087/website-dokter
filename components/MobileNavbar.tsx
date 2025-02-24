import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import MobileNavbarAction from "./MobileNavbarAction";

const MobileNavbar = () => {
  const path = usePathname();
  return (
    <div className="absolute top-[72px] left-0 bg-white flex lg:hidden flex-col w-full p-8 gap-y-4">
      <Link href="/" className={cn(path == "/" && "border-b-2")}>
        Home
      </Link>

      <MobileNavbarAction />
    </div>
  );
};

export default MobileNavbar;
