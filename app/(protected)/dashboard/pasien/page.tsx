import { Button, buttonVariants } from "@/components/ui/button";
import { antrians } from "@/data/antrian";
import { AntrianTableDef } from "../_antrianTable/columns";
import { DataTable } from "../../_components/DataTable";
import { pasienAntrianColumns } from "./columns";
import PasienChart from "../_chart/pasienChart";
import AntrianChart from "./_antrianChart/AntrianChart";
import Link from "next/link";
async function getDataAntrian(): Promise<AntrianTableDef[]> {
  return antrians;
}
const PasienPage = async () => {
  const dataAntrian = await getDataAntrian();

  return (
    <div className="p-4 flex flex-col gap-y-4">
      <div className="flex gap-x-4 items-center h-72">
        <div className="rounded shadow-md min-w-72 h-full p-4 flex flex-col justify-between items-center">
          <h3 className="text-lg">No Antrian</h3>
          <h2 className="text-6xl font-bold">12</h2>
          <Button className="w-full">Selanjutnya</Button>
        </div>
        <div className="p-4 w-full rounded shadow-md">
          <AntrianChart />
        </div>
      </div>
      <div className="rounded shadow-md w-full p-4 flex justify-end">
        <Link href={"/dashboard/pasien/create"} className={buttonVariants()}>
          Tambahkan antrian
        </Link>
      </div>
      <DataTable
        columns={pasienAntrianColumns}
        data={dataAntrian}
        title="Antrian"
      />
    </div>
  );
};

export default PasienPage;
