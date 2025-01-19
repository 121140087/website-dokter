import { ReactNode } from "react";
import Sidebar from "./_components/Sidebar";
import DashboardNavbar from "./_components/DashboardNavbar";
import { auth } from "@/auth";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <DashboardNavbar />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
