"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
  name: string;
  link: string;
}
const SidebarItem = ({ link, name }: SidebarItemProps) => {
  const pathName = usePathname();
  const isDashboard = link == "/dashboard";
  const isActive = isDashboard
    ? pathName == "/dashboard"
    : pathName.startsWith(link);
  return (
    <Link
      href={link}
      className={cn(
        "w-full p-4 border-b-2 border-slate-100",
        isActive && "bg-slate-200 border-none"
      )}
    >
      {name}
    </Link>
  );
};

export default SidebarItem;
