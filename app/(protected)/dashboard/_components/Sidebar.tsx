import { Feather } from "lucide-react";
import Link from "next/link";
import SidebarItem from "./SidebarItem";
import { Role } from "@prisma/client";

const Sidebar = ({ role }: { role: Role }) => {
  const sidebarItems = [
    {
      name: "Dashboard",
      link: "/dashboard",
      role: [Role.DOKTER, Role.RESEPSIONIS],
    },
    {
      name: "Antrian",
      link: "/dashboard/antrian",
      role: [Role.RESEPSIONIS],
    },
    {
      name: "Pemeriksaan",
      link: "/dashboard/pemeriksaan",
      role: [Role.DOKTER],
    },
    {
      name: "Pasien",
      link: "/dashboard/pasien",
      role: [Role.RESEPSIONIS, Role.DOKTER],
    },

    {
      name: "Obat",
      link: "/dashboard/obat",
      role: [Role.RESEPSIONIS],
    },
    {
      name: "Pesan",
      link: "/dashboard/pesan",
      role: [Role.DOKTER],
    },
    {
      name: "Jadwal",
      link: "/dashboard/jadwal",
      role: [Role.RESEPSIONIS, Role.DOKTER],
    },
    {
      name: "Settings",
      link: "/dashboard/settings",
      role: [Role.RESEPSIONIS, Role.DOKTER],
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
