"use client";
import { buttonVariants } from "@/components/ui/button";
import { Obat } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DataTable } from "../_components/DataTable";
import { getObats } from "./_actions/getObats";
import { obatColumns } from "./columns";

const ObatPage = () => {
  const [obats, setObats] = useState<Obat[] | undefined>();
  const updateObats = async () => {
    const response = await getObats();
    setObats(response);
  };
  useEffect(() => {
    updateObats();
  }, []);
  return (
    <div className="p-4 flex flex-col gap-y-4">
      <div className="rounded shadow p-4 w-full">
        <Link href={"/dashboard/obat/create"} className={buttonVariants()}>
          Tambahkan Obat
        </Link>
      </div>
      <DataTable columns={obatColumns} data={obats ?? []} title="Data Obat" />
    </div>
  );
};

export default ObatPage;
