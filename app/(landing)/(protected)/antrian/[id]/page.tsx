"use client";

import { getAntrianById } from "@/actions/getAntrianById";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { Skeleton } from "@/components/ui/skeleton";
import { Antrian, Jadwal } from "@prisma/client";
import { format } from "date-fns";
import { useEffect, useState } from "react";

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
    <div className="relative max-w-md mx-auto mt-20 rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white">
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 z-20 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-sm text-muted-foreground">Memuat data...</p>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-blue-600 text-white py-5 px-6 text-center">
        <h2 className="text-2xl font-bold">Klinik Dr. Hema Malini</h2>
        <p className="text-sm mt-1">Nomor Antrian Anda</p>
      </div>

      {/* Antrian Number */}
      <div className="bg-slate-900 text-white flex justify-center items-center h-52 relative">
        {loading ? (
          <Skeleton className="h-16 w-32 rounded-lg" />
        ) : (
          <p className="text-7xl font-extrabold tracking-wider drop-shadow-lg">
            {antrian?.noAntrian}
          </p>
        )}
      </div>

      {/* Jadwal Info */}
      <div className="p-6 text-center space-y-2">
        {loading ? (
          <>
            <Skeleton className="h-5 w-2/3 mx-auto" />
            <Skeleton className="h-4 w-1/3 mx-auto" />
          </>
        ) : (
          <>
            <p className="text-lg font-semibold text-slate-800">
              {format(antrian!.jadwal.tanggal, "dd MMMM yyyy")}
            </p>
            <p className="text-sm text-muted-foreground">Jam {antrian!.jam}</p>
          </>
        )}
      </div>

      {/* Footer Note */}
      <div className="bg-slate-100 text-center text-sm text-muted-foreground py-4 px-6 border-t">
        Tunjukkan kartu ini saat pemeriksaan
      </div>
    </div>
  );
};

export default DetailAntrian;
