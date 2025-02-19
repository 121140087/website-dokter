"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { auth } from "@/auth";
import { Role } from "@prisma/client";
import { useEffect, useState } from "react";
import { User } from "next-auth";
import DesktopNavbarAction from "./DesktopNavbarAction";

const DesktopNavbar = () => {
  return (
    <div className="hidden lg:flex gap-x-8 items-center">
      <Link href="/">Beranda</Link>
      <DesktopNavbarAction />
    </div>
  );
};

export default DesktopNavbar;
