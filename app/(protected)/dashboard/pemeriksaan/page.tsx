"use client";
import { useEffect, useState } from "react";
import { DataTable } from "../_components/DataTable";
import PasienForm from "./_components/PasienForm";
import { pemeriksaanColumn } from "./columns";
import { Pemeriksaan } from "@prisma/client";
import { getPemeriksaan } from "./_actions/getPemeriksaan";

const PemeriksaanPage = () => {
  const [pemeriksaan, setPemeriksaan] = useState<Pemeriksaan[]>([]);

  const updatePemeriksaan = async () => {
    const response = await getPemeriksaan();
    if (response) {
      setPemeriksaan(response);
    }
  };
  useEffect(() => {
    updatePemeriksaan();
  }, []);
  return (
    <div className="p-4 flex flex-col gap-y-8">
      <PasienForm />
      <DataTable
        columns={pemeriksaanColumn}
        data={pemeriksaan}
        title="Hasil Pemeriksaan"
        searchKey="pasienNik"
      />
    </div>
  );
};

export default PemeriksaanPage;
