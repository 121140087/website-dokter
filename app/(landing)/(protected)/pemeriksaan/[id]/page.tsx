"use client";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getPemeriksaanById } from "@/app/(protected)/dashboard/pemeriksaan/_actions/getPemeriksaanById";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Dokter, Obat, Pasien, Pemeriksaan, ResepObat } from "@prisma/client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const PemeriksaanDetailPage = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const [pemeriksaan, setPemeriksaan] = useState<
    | ({
        pasien: Pasien;
        dokter: Dokter;
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
      <div className="max-w-xl mx-auto mt-32 px-4 animate-pulse space-y-4">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-8 w-1/2 mt-4" />
      </div>
    );
  }

  const biayaSection = (
    <div className="grid grid-cols-2 gap-4 mt-6 text-sm text-center border-t pt-4">
      <InfoItem
        label="Biaya Pemeriksaan"
        value={`Rp. ${pemeriksaan.hargaPemeriksaan}`}
      />
      <InfoItem label="Biaya Obat" value={`Rp. ${pemeriksaan.hargaResep}`} />
      <div className="col-span-2 border-t pt-4 font-bold text-primary text-lg">
        Total: Rp. {pemeriksaan.totalHarga}
      </div>
    </div>
  );

  if (pemeriksaan.dibayar) {
    return (
      <div className="max-w-4xl mx-auto mt-20 p-6 bg-white border rounded-2xl shadow-md space-y-8 animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">
          Hasil Pemeriksaan
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <InfoItem label="ID Pemeriksaan" value={pemeriksaan.id} />
          <InfoItem
            label="Tanggal"
            value={new Date(pemeriksaan.createdAt).toLocaleString()}
          />
          <InfoItem label="Dokter" value={pemeriksaan.dokter.nama} />
          <InfoItem label="NIK Pasien" value={pemeriksaan.pasienNik} />
          <InfoItem
            label="Tinggi Badan"
            value={`${pemeriksaan.tinggiBadan} cm`}
          />
          <InfoItem
            label="Berat Badan"
            value={`${pemeriksaan.beratBadan} kg`}
          />
          <InfoItem label="Suhu Tubuh" value={`${pemeriksaan.suhu} °C`} />
          <InfoItem
            label="Detak Jantung"
            value={`${pemeriksaan.detakJantung} bpm`}
          />
          <InfoItem
            label="Gula Darah"
            value={`${pemeriksaan.gulaDarah} mg/dL`}
          />
          <InfoItem
            label="Trombosit"
            value={`${pemeriksaan.trombosit} 10^3/µL`}
          />
          <InfoItem
            label="Tekanan Darah"
            value={`${pemeriksaan.tekananDarahTDS}/${pemeriksaan.tekananDarahTTD} mmHg`}
          />
          <InfoItem label="Diagnosis" value={pemeriksaan.diagnosis} />
        </div>

        {biayaSection}

        <div>
          <h3 className="text-xl font-semibold text-center text-muted-foreground mb-4">
            Resep Obat
          </h3>
          <div className="overflow-x-auto border rounded-lg">
            <table className="min-w-full text-sm text-center">
              <thead className="bg-muted/40 text-muted-foreground">
                <tr>
                  <th className="py-2 px-4">Nama Obat</th>
                  <th className="py-2 px-4">Jumlah</th>
                  <th className="py-2 px-4">Harga</th>
                </tr>
              </thead>
              <tbody>
                {pemeriksaan.resepObat.map((r) => (
                  <tr
                    key={r.id}
                    className="border-t hover:bg-muted/20 transition-colors"
                  >
                    <td className="py-2 px-4">{r.obat?.nama ?? "-"}</td>
                    <td className="py-2 px-4">{r.jumlah}</td>
                    <td className="py-2 px-4">
                      Rp. {r.jumlah * (r.obat?.harga ?? 0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs mt-4 italic text-center text-muted-foreground">
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
      redirect(`https://app.midtrans.com/snap/v2/vtweb/${result.token}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-40 bg-white border rounded-2xl shadow-md p-6 space-y-6 text-center animate-fade-in">
      <p className="text-lg font-medium">
        Untuk melihat hasil pemeriksaan, silakan selesaikan pembayaran:
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

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col">
    <span className="font-medium text-muted-foreground">{label}</span>
    <span className="text-foreground">{value}</span>
  </div>
);

export default PemeriksaanDetailPage;
