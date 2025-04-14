import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  antrianColumns,
  AntrianTableDef,
} from "./_components/_table/_antrianTable/columns";
import { antrians } from "@/data/antrian";
import { DataTable } from "./_components/DataTable";
import {
  obatColumns,
  ObatTableDef,
} from "./_components/_table/_obatTable/columns";
import { obats } from "@/data/obats";
import { ListMinus, Pill, User } from "lucide-react";
import PasienChart from "./_chart/pasienChart";
import { Antrian, Obat } from "@prisma/client";
import { getAntrians } from "./antrian/_actions/getAntrians";
import { getObats } from "./obat/_actions/getObats";
import ResepObatChart from "./_chart/resepObatChart";
import PendapatanChart from "./_chart/pendapatanChart";
async function getDataAntrian(): Promise<Antrian[]> {
  const response = await getAntrians();
  return response;
}
async function getDataObat(): Promise<Obat[]> {
  const response = await getObats();
  return response;
}
const DashboardPage = async () => {
  const dataAntrian = await getDataAntrian();
  const dataObat = await getDataObat();
  return (
    <div className="flex flex-col gap-y-6 items-center p-4">
      <div className="grid grid-cols-2 gap-4 w-full">
        <ResepObatChart />
        <PendapatanChart />
      </div>
      <div className="grid grid-cols-3 gap-4 w-full mt-12">
        <div className="col-span-2">
          <DataTable
            columns={antrianColumns}
            data={dataAntrian}
            title="Antrian"
          />
        </div>
        <div className="col-span-1">
          <DataTable columns={obatColumns} data={dataObat} title="Stok obat" />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
