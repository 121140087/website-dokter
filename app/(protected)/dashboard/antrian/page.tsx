"use client";
import { buttonVariants } from "@/components/ui/button";
import { Antrian, Jadwal } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DataTable } from "../_components/DataTable";
import { getAntrians } from "./_actions/getAntrians";
import AntrianChart from "./_antrianChart/AntrianChart";
import CurrentAntrian from "./_components/CurrentAntrian";
import { pasienAntrianColumns } from "./columns";
const PasienPage = () => {
  const [antrians, setAntrians] = useState<(Antrian & { jadwal: Jadwal })[]>(
    []
  );
  const updateAntrians = async () => {
    const response = await getAntrians();
    response.sort((a, b) => {
      return a.jadwal.tanggal.getTime() - b.jadwal.tanggal.getTime();
    });
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
        customFilter={(rangeFilter) => {
          const today = new Date();
          return antrians.filter((item) => {
            const createdAt = new Date(item.jadwal.tanggal);

            switch (rangeFilter) {
              case "harian":
                return createdAt.toDateString() === today.toDateString();

              case "mingguan": {
                const startOfWeek = new Date(today);
                startOfWeek.setDate(today.getDate() - today.getDay());
                const endOfWeek = new Date(startOfWeek);
                endOfWeek.setDate(startOfWeek.getDate() + 6);
                return createdAt >= startOfWeek && createdAt <= endOfWeek;
              }

              case "bulanan":
                return (
                  createdAt.getFullYear() === today.getFullYear() &&
                  createdAt.getMonth() === today.getMonth()
                );

              case "tahunan":
                return createdAt.getFullYear() === today.getFullYear();

              case "semua":
              default:
                return true;
            }
          });
        }}
      />
    </div>
  );
};

export default PasienPage;
