import { ReactNode } from "react";
import Sidebar from "../_components/Sidebar";
import DashboardNavbar from "../_components/DashboardNavbar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
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
