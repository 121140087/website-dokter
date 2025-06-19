"use client";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
const Navbar = () => {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [enableNavbarShadow, setEnableNavbarShadow] = useState(false);
  const onMenuClick = () => {
    setIsShowMenu(!isShowMenu);
  };
  useEffect(() => {
    window.addEventListener(
      "scroll",
      () => {
        const position = window.pageYOffset;
        if (position > 0) {
          setEnableNavbarShadow(true);
        } else {
          setEnableNavbarShadow(false);
        }
      },
      { passive: true }
    );
  }, []);
  return (
    <nav
      className={cn(
        "w-full z-20 h-[72px] items-center px-8 flex lg:px-36 xl:px-52 2xl:px-72  justify-between top-0 sticky bg-white",
        enableNavbarShadow && "shadow-sm"
      )}
    >
      <Link className="text-xl font-bold " href="/">
        Dokter Hema Malini
      </Link>
      <DesktopNavbar />
      {isShowMenu && <MobileNavbar />}
      <Menu
        className="block lg:hidden w-8 h-8 cursor-pointer"
        onClick={onMenuClick}
      />
    </nav>
  );
};

export default Navbar;
