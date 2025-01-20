import { Feather } from "lucide-react";
import Link from "next/link";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  const sidebarItems = [
    {
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "Antrian",
      link: "/dashboard/antrian",
    },
    {
      name: "Pasien",
      link: "/dashboard/pasien",
    },
    {
      name: "Obat",
      link: "/dashboard/obat",
    },
    {
      name: "Pesan",
      link: "/dashboard/pesan",
    },
    {
      name: "Jadwal",
      link: "/dashboard/jadwal",
    },
    {
      name: "Settings",
      link: "/dashboard/settings",
    },
  ];
  return (
    <div className="sticky top-0 left-0 w-[300px] items-center bg-white border-r-2 h-screen flex flex-col gap-y-8">
      <Feather className="w-14 h-14 text-slate-500 mt-8" />
      <div className="flex flex-col w-full">
        {sidebarItems.map((s) => {
          return <SidebarItem link={s.link} name={s.name} key={s.link} />;
        })}
      </div>
    </div>
  );
};

export default Sidebar;
