"use client";
import { DataTable } from "../_components/DataTable";
import { obatColumns } from "./columns";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Obat } from "@prisma/client";
import { getObats } from "./_actions/getObats";

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
