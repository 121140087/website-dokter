"use client";
import { buttonVariants } from "@/components/ui/button";
import { DataTable } from "../_components/DataTable";
import { pasienAntrianColumns } from "./columns";
import AntrianChart from "./_antrianChart/AntrianChart";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Antrian } from "@prisma/client";
import CurrentAntrian from "./_components/CurrentAntrian";
import { getAntrians } from "./_actions/getAntrians";
const PasienPage = () => {
  const [antrians, setAntrians] = useState<Antrian[]>([]);
  const updateAntrians = async () => {
    const response = await getAntrians();
    setAntrians(response);
  };
  useEffect(() => {
    updateAntrians();
  }, []);
  return (
    <div className="p-4 flex flex-col gap-y-4">
      <div className="flex gap-x-4 items-center h-72">
        <CurrentAntrian />
        <div className="p-4 w-full rounded shadow-md">
          <AntrianChart />
        </div>
      </div>
      <div className="rounded shadow-md w-full p-4 flex justify-end">
        <Link href={"/dashboard/antrian/create"} className={buttonVariants()}>
          Tambahkan antrian
        </Link>
      </div>
      <DataTable
        columns={pasienAntrianColumns}
        data={antrians}
        title="Antrian"
        defaultFilter="harian"
      />
    </div>
  );
};

export default PasienPage;
