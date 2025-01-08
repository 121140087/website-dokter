"use client";
import { obatsData } from "@/data/obatsData";
import { DataTable } from "../../_components/DataTable";
import { obatColumns } from "./columns";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const ObatPage = () => {
  return (
    <div className="p-4 flex flex-col gap-y-4">
      <div className="rounded shadow p-4 w-full">
        <Link href={"/dashboard/obat/create"} className={buttonVariants()}>
          Tambahkan Obat
        </Link>
      </div>
      <DataTable columns={obatColumns} data={obatsData} title="Data Obat" />
    </div>
  );
};

export default ObatPage;
