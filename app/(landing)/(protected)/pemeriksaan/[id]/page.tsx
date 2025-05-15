"use client";
import { getPemeriksaanById } from "@/app/(protected)/dashboard/pemeriksaan/_actions/getPemeriksaanById";
import { Button } from "@/components/ui/button";
import { Obat, Pasien, Pemeriksaan, ResepObat } from "@prisma/client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { getCurrentUser } from "@/actions/getCurrentUser";

const PemeriksaanDetailPage = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const [pemeriksaan, setPemeriksaan] = useState<
    | ({
        pasien: Pasien;
        resepObat: (ResepObat & { obat: Obat | undefined })[];
      } & Pemeriksaan)
    | null
  >(null);

  const updatePemeriksaan = async () => {
    const par = await params;
    const [pem, user] = await Promise.all([
      getPemeriksaanById(par.id),
      getCurrentUser(),
    ]);

    // Jika tidak ditemukan atau bukan milik user
    if (!pem || pem.pasienNik !== user?.nik) {
      window.location.replace("/pemeriksaan");
      return;
    }
    setPemeriksaan(pem);
  };

  useEffect(() => {
    updatePemeriksaan();
  }, []);

  if (!pemeriksaan) {
    return (
      <div className="max-w-xl mx-auto mt-32 px-4">
        <Skeleton className="h-8 w-1/2 mb-6" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-8 w-1/2 mt-6" />
      </div>
    );
  }

  if (pemeriksaan.dibayar) {
    return (
      <div className="max-w-2xl mx-auto mt-24 p-6 bg-white border rounded-xl shadow-sm space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-center mb-4">
            Hasil Pemeriksaan
          </h2>
          <div className="grid grid-cols-2 gap-4 text-sm border-t pt-4">
            <p className="font-medium">ID Pemeriksaan</p>
            <p>{pemeriksaan.id}</p>
            <p className="font-medium">NIK Pasien</p>
            <p>{pemeriksaan.pasienNik}</p>
            <p className="font-medium">Detak Jantung</p>
            <p>{pemeriksaan.detakJantung} bpm</p>
            <p className="font-medium">Gula Darah</p>
            <p>{pemeriksaan.gulaDarah} mg/dL</p>
            <p className="font-medium">Trombosit</p>
            <p>{pemeriksaan.trombosit} 10^3/µL</p>
            <p className="font-medium">Tekanan Darah</p>
            <p>
              {pemeriksaan.tekananDarahTDS}/{pemeriksaan.tekananDarahTTD} mmHg
            </p>
            <p className="font-medium">Diagnosis</p>
            <p>{pemeriksaan.diagnosis}</p>
          </div>
        </div>

        <div className="pt-4 border-t">
          <h3 className="text-xl font-semibold text-center mb-4">Resep Obat</h3>
          <div className="grid grid-cols-3 font-bold text-sm text-center border-b pb-2">
            <p>Nama Obat</p>
            <p>Jumlah</p>
            <p>Harga</p>
          </div>
          <div className="space-y-2 mt-2">
            {pemeriksaan.resepObat.map((r) => (
              <div className="grid grid-cols-3 text-center text-sm" key={r.id}>
                <p>{r.obat?.nama || "-"}</p>
                <p>{r.jumlah}</p>
                <p>Rp. {r.jumlah * (r.obat?.harga ?? 0)}</p>
              </div>
            ))}
          </div>
          <p className="text-xs mt-6 italic text-center text-muted-foreground">
            * Tunjukkan pada kasir untuk mengambil obat
          </p>
        </div>
      </div>
    );
  }

  const bayar = async () => {
    if (pemeriksaan.totalHarga === 0) {
      toast(
        "Anda tidak perlu membayar. Silahkan konfirmasi ke dokter atau admin untuk melihat hasil pemeriksaan."
      );
      return;
    }

    const response = await fetch("/api/payment", {
      body: JSON.stringify({
        pemeriksaanId: pemeriksaan.id,
        price: pemeriksaan.totalHarga,
      }),
      method: "POST",
    });

    const result = await response.json();
    if (result.token) {
      redirect(
        `https://app.sandbox.midtrans.com/snap/v2/vtweb/${result.token}`
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-40 bg-white border rounded-xl shadow-sm p-6 space-y-6 text-center">
      <p className="text-lg font-medium">
        Untuk melihat hasil pemeriksaan, silakan selesaikan pembayaran sebesar:
      </p>
      <p className="text-3xl font-bold text-primary">
        Rp. {pemeriksaan.totalHarga}
      </p>
      <Button onClick={bayar} className="w-full">
        Bayar Sekarang
      </Button>
    </div>
  );
};

export default PemeriksaanDetailPage;
