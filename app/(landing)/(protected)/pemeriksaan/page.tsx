"use client";
import { getPasienPemeriksaan } from "@/actions/getPasienPemeriksaan";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Pemeriksaan } from "@prisma/client";
import { format } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";

const PemeriksaanPage = () => {
  const [pemeriksaan, setPemeriksaan] = useState<Pemeriksaan[]>([]);
  const updateData = async () => {
    const response = await getPasienPemeriksaan();
    if (response) {
      setPemeriksaan(response);
    }
  };
  useEffect(() => {
    updateData();
  }, []);
  return (
    <div className="px-8 md:px-16 lg:px-36 xl:px-52 2xl:px-96 mt-24">
      <h1 className="font-bold text-4xl text-center my-6">
        Daftar Pemeriksaan
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pemeriksaan.map((p) => {
          return (
            <div
              key={p.id}
              className="w-full rounded border p-4 flex flex-col gap-y-3"
            >
              <p>
                <b>Tanggal</b> : {format(p.createdAt, "dd MMM yyyy")}
              </p>
              <p className="font-bold">Diagnosis</p>
              <p>{p.diagnosis}</p>
              <p>Biaya Pemeriksaan : Rp. {p.totalHarga}</p>
              {true && (
                <Link
                  className={cn("w-full", buttonVariants())}
                  href={`/pemeriksaan/${p.id}`}
                >
                  Lihat Detail Pemeriksaan
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PemeriksaanPage;
