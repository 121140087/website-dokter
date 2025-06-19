"use client";
import { getPasienPemeriksaan } from "@/actions/getPasienPemeriksaan";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Pemeriksaan } from "@prisma/client";
import { format } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";

const PemeriksaanPage = () => {
  const [pemeriksaan, setPemeriksaan] = useState<Pemeriksaan[]>([]);
  const [loading, setLoading] = useState(true);
  const updateData = async () => {
    setLoading(true);
    const response = await getPasienPemeriksaan();
    if (response) {
      setPemeriksaan(response);
    }
    setLoading(false);
  };
  useEffect(() => {
    updateData();
  }, []);
  return (
    <div className="px-8 md:px-16 lg:px-36 xl:px-52 2xl:px-96 mt-24">
      <h1 className="font-bold text-4xl text-center my-6">
        Daftar Pemeriksaan
      </h1>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="w-full rounded border p-4 flex flex-col gap-y-3"
            >
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-8 w-1/2 mt-2" />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pemeriksaan.length === 0 ? (
              <div className="flex flex-col items-center col-span-full mt-8">
                <p className="text-lg text-center mb-4">
                  Belum ada pemeriksaan yang tercatat.
                </p>
                <Link href="/">
                  <Button>Ke Beranda</Button>
                </Link>
              </div>
            ) : (
              pemeriksaan.map((p) => (
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
                  <Link
                    className={cn("w-full", buttonVariants())}
                    href={`/pemeriksaan/${p.id}`}
                  >
                    Lihat Detail Pemeriksaan
                  </Link>
                </div>
              ))
            )}{" "}
          </div>
        </>
      )}
    </div>
  );
};

export default PemeriksaanPage;
