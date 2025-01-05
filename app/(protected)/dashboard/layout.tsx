import { ReactNode } from "react";
import Sidebar from "../_components/Sidebar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Sidebar />
      {children}
    </div>
  );
};

export default DashboardLayout;
