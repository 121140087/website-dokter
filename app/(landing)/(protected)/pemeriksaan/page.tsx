"use client";
import { getPasienPemeriksaan } from "@/actions/getPasienPemeriksaan";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Pemeriksaan } from "@prisma/client";
import { format } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

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
    <div className="px-6 md:px-12 lg:px-24 xl:px-40 2xl:px-64 mt-24">
      <h1 className="font-extrabold text-4xl text-center mb-10 text-primary">
        Riwayat Pemeriksaan
      </h1>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border p-5 shadow-sm bg-white space-y-3"
            >
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-8 w-1/2 mt-3" />
            </div>
          ))}
        </div>
      ) : pemeriksaan.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-lg text-muted-foreground mb-4">
            Belum ada pemeriksaan yang tercatat.
          </p>
          <Link href="/">
            <Button>Ke Beranda</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pemeriksaan.map((p) => (
            <div
              key={p.id}
              className="rounded-xl border p-6 shadow-sm hover:shadow-md transition-all bg-white flex flex-col justify-between"
            >
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {format(p.createdAt, "EEEE, dd MMMM yyyy")}
                </p>
                <p className="font-semibold text-lg text-primary">Diagnosis</p>
                <p className="text-gray-700">{p.diagnosis}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Biaya Pemeriksaan
                </p>
                <p className="font-medium">{formatCurrency(p.totalHarga)}</p>
              </div>

              <Link
                href={`/pemeriksaan/${p.id}`}
                className={cn("mt-6", buttonVariants({ variant: "default" }))}
              >
                Lihat Detail Pemeriksaan
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PemeriksaanPage;
