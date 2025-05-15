"use client";
import { getAntrianById } from "@/actions/getAntrianById";
import { Antrian, Jadwal } from "@prisma/client";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/router";
import { getCurrentUser } from "@/actions/getCurrentUser";

const DetailAntrian = ({ params }: { params: Promise<{ id: string }> }) => {
  const [antrian, setAntrian] = useState<Antrian & { jadwal: Jadwal }>();
  const [loading, setLoading] = useState(true);

  const updateAntrian = async () => {
    setLoading(true);
    const par = await params;

    const [response, user] = await Promise.all([
      getAntrianById(par.id),
      getCurrentUser(),
    ]);

    // Jika tidak ditemukan atau bukan milik user
    if (!response || response.pasienNIK !== user?.nik) {
      window.location.replace("/daftar-janji");
      return;
    }

    setAntrian(response);
    setLoading(false);
  };

  useEffect(() => {
    updateAntrian();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-20 rounded-xl overflow-hidden shadow-lg border">
      <div className="bg-primary text-white py-4 px-6 text-center">
        <h2 className="text-xl font-bold">Klinik Dr. Hema Malini</h2>
        <p className="text-sm">Nomor Antrian Anda</p>
      </div>

      <div className="bg-slate-900 text-white flex justify-center items-center h-48">
        {loading ? (
          <Skeleton className="h-12 w-24" />
        ) : (
          <p className="text-6xl font-extrabold tracking-widest">
            {antrian?.noAntrian}
          </p>
        )}
      </div>

      <div className="p-6 text-center">
        {loading ? (
          <Skeleton className="h-4 w-2/3 mx-auto" />
        ) : (
          <div>
            <p className="text-lg font-semibold">
              {format(antrian!.jadwal.tanggal, "dd MMM yyyy")}
            </p>
            <p className="text-md text-muted-foreground mt-1">{antrian!.jam}</p>
          </div>
        )}
      </div>

      <div className="bg-slate-100 text-center text-sm text-muted-foreground py-3 px-6 border-t">
        Tunjukkan kartu ini saat pemeriksaan
      </div>
    </div>
  );
};

export default DetailAntrian;
