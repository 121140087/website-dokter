"use client";
import { Pemeriksaan } from "@prisma/client";
import { useEffect, useState } from "react";
import { DataTable } from "../_components/DataTable";
import { getPemeriksaan } from "./_actions/getPemeriksaan";
import PasienForm from "./_components/PasienForm";
import { pemeriksaanColumn } from "./columns";

const PemeriksaanPage = () => {
  const [pemeriksaan, setPemeriksaan] = useState<Pemeriksaan[]>([]);

  const updatePemeriksaan = async () => {
    const response = await getPemeriksaan();
    if (response) {
      setPemeriksaan(response);
    }
  };
  // jadi kalau mau lihat itu apa, tinggal ctrl terus klik yang mau diliat, nanti batal diarahin langsung ke kode dan filenya
  useEffect(() => {
    updatePemeriksaan();
  }, []);
  return (
    <div className="p-4 flex flex-col gap-y-8">
      <PasienForm />
      <DataTable
        columns={pemeriksaanColumn} // kalau mau lihat isinya, tinggal ctrl terus klik fungsi / variabelnya
        data={pemeriksaan} // ini data pemeriksaannya
        title="Hasil Pemeriksaan" // ini judulnya
        searchKey="pasienNik" // ini untuk pencarian, mau berdasarkan apa
      />
    </div>
  );
};

export default PemeriksaanPage;
