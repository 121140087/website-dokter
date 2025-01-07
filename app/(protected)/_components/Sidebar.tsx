import { Feather } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="absolute top-0 left-0 w-[300px] items-center bg-white border-r-2 h-screen flex flex-col gap-y-8">
      <Feather className="w-14 h-14 text-slate-500 mt-8" />
      <div className="flex flex-col w-full">
        <Link href="/dashboard" className="w-full p-4 bg-slate-100">
          Dashboard
        </Link>
        <Link
          href="/dashboard/pasien"
          className="w-full p-4 border-b-2 border-slate-100"
        >
          Pasien
        </Link>
        <Link
          href="/dashboard/obat"
          className="w-full p-4 border-b-2 border-slate-100"
        >
          Obat
        </Link>
        <Link
          href="/dashboard/pesan"
          className="w-full p-4 border-b-2 border-slate-100"
        >
          Pesan
        </Link>
        <Link
          href="/dashboard/jadwal"
          className="w-full p-4 border-b-2 border-slate-100"
        >
          Jadwal
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
