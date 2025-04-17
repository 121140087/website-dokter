"use client";
import { DataTable } from "../_components/DataTable";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Obat, Pasien } from "@prisma/client";
import { getPasiens } from "./_actions/getpasiens";
import { pasienColumn } from "./columns";

const PasienPage = () => {
  const [pasiens, setPasiens] = useState<Pasien[] | undefined>();
  const updateObats = async () => {
    const response = await getPasiens();
    setPasiens(response);
  };
  useEffect(() => {
    updateObats();
  }, []);
  return (
    <div className="p-4 flex flex-col gap-y-4">
      <div className="rounded shadow p-4 w-full">
        <Link href={"/dashboard/pasien/create"} className={buttonVariants()}>
          Tambahkan Pasien
        </Link>
      </div>
      <DataTable
        columns={pasienColumn}
        data={pasiens ?? []}
        title="Data Pasien"
      />
    </div>
  );
};

export default PasienPage;
