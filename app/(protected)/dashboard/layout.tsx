"use server";
import { ReactNode } from "react";
import Sidebar from "./_components/Sidebar";
import DashboardNavbar from "./_components/DashboardNavbar";
import { auth } from "@/auth";
import { Role } from "@prisma/client";

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
