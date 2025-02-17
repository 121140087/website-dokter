"use client";
import { getPemeriksaanById } from "@/app/(protected)/dashboard/pemeriksaan/_actions/getPemeriksaanById";
import PesanPage from "@/app/(protected)/dashboard/pesan/page";
import { Button } from "@/components/ui/button";
import { Pemeriksaan } from "@prisma/client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const PemeriksaanDetailPage = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const [pemeriksaan, setPemeriksaan] = useState<Pemeriksaan | null>();
  const updatePemeriksaan = async () => {
    const par = await params;
    const pem = await getPemeriksaanById(par.id);
    setPemeriksaan(pem);
  };
  useEffect(() => {
    updatePemeriksaan();
  }, []);
  if (!pemeriksaan) {
    return <div className="text-center mx-auto font-bold text-xl">Loading</div>;
  }
  if (true) {
    return (
      <div>
        <div className=" p-4 rounded border max-w-[500px] mx-auto mt-32 flex flex-col">
          <p className="font-bold text-xl text-center">Hasil Pemeriksaan</p>

          <div className="grid grid-cols-2 divide-x-2 divide-y-2 gap-4">
            <p>Detak Jantung</p>
            <p>{pemeriksaan.detakJantung} bpm</p>
            <p>Gula Darah</p>
            <p>{pemeriksaan.gulaDarah} mg/dL</p>
            <p>Trombosit</p>
            <p>{pemeriksaan.trombosit} 10^3/µL</p>
            <p>Tekanan Darah</p>
            <p>
              {pemeriksaan.tekananDarahTDS}/{pemeriksaan.tekananDarahTTD} mmHg
            </p>
            <p>Diagnosis</p>
            <p>{pemeriksaan.diagnosis}</p>
          </div>
        </div>
        <div className="p-4 rounded border max-w-[500px] mx-auto mt-8 flex flex-col">
          <p className="font-bold text-xl text-center">Resep</p>
        </div>
      </div>
    );
  }
  const bayar = async () => {
    if (pemeriksaan) {
      if (pemeriksaan.totalHarga === 0) {
        toast(
          "Anda tidak perlu membayar. Silahkan konfirmasi ke dokter / admin untuk melihat hasil pemeriksaan"
        );
        return;
      }
      const response = await fetch("/api/payment", {
        body: JSON.stringify({
          pemeriksaanId: pemeriksaan.id,
          price: pemeriksaan?.totalHarga,
        }),
        method: "POST",
      });
      const result = await response.json();
      if (result.token) {
        redirect(
          `https://app.sandbox.midtrans.com/snap/v2/vtweb/${result.token}`
        );
      }
    }
  };

  return (
    <div className="max-w-[400px] mx-auto mt-48 p-4 rounded border flex flex-col gap-y-4">
      <p className="text-center text-lg">
        Untuk melihat hasil pemeriksaan, anda diharuskan membayar biaya layanan
        dan obat sebesar
      </p>
      <p className="text-center font-bold text-3xl">
        Rp.{pemeriksaan.totalHarga}
      </p>
      <Button onClick={bayar} className="w-full">
        Bayar
      </Button>
    </div>
  );
};

export default PemeriksaanDetailPage;
