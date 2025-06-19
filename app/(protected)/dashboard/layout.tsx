"use server";
import { auth } from "@/auth";
import { Role } from "@prisma/client";
import { ReactNode } from "react";
import DashboardNavbar from "./_components/DashboardNavbar";
import Sidebar from "./_components/Sidebar";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  return (
    <div className="flex">
      <Sidebar role={session?.user.role ?? Role.RESEPSIONIS} />
      <div className="flex flex-col w-full">
        <DashboardNavbar />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
