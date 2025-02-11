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
import PasienChart from "./_components/_chart/pasienChart";
async function getDataAntrian(): Promise<AntrianTableDef[]> {
  return antrians;
}
async function getDataObat(): Promise<ObatTableDef[]> {
  return obats;
}
const DashboardPage = async () => {
  const dataAntrian = await getDataAntrian();
  const dataObat = await getDataObat();
  return (
    <div className="flex flex-col gap-y-6 items-center p-4">
      <div className="flex w-full gap-x-4">
        <div className="w-[250px] rounded shadow p-4 flex flex-col justify-between h-[220px]">
          <p>Nama Tempat Praktik</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit </p>
          <Button className="w-full">Buka</Button>
        </div>
        <div className="w-full flex-1 rounded shadow flex flex-col p-4">
          <div className="flex items-center gap-x-4">
            <div className="rounded-full bg-slate-100 w-20 h-20 flex items-center justify-center">
              <ListMinus className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold">Pasien</h3>
          </div>
          <PasienChart />
        </div>
        <div className="w-full flex-1 rounded shadow flex flex-col p-4">
          <div className="flex items-center gap-x-4">
            <div className="rounded-full bg-slate-100 w-20 h-20 flex items-center justify-center">
              <Pill className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold">Penjualan Obat</h3>
          </div>
          <PasienChart />
        </div>
        <div className="w-full flex-1 rounded shadow flex flex-col p-4">
          <div className="flex items-center gap-x-4">
            <div className="rounded-full bg-slate-100 w-20 h-20 flex items-center justify-center">
              <User className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold">Pengunjung Website</h3>
          </div>
          <PasienChart />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
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
