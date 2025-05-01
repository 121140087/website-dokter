"use client";
import { getAntrianById } from "@/actions/getAntrianById";
import { getAntrians } from "@/app/(protected)/dashboard/antrian/_actions/getAntrians";
import { Antrian, Jadwal } from "@prisma/client";
import { format } from "date-fns";
import { useEffect, useState } from "react";

const DetailAntrian = ({ params }: { params: Promise<{ id: string }> }) => {
  const [antrian, setAntrian] = useState<Antrian & { jadwal: Jadwal }>();
  const updateAntrian = async () => {
    const par = await params;
    const response = await getAntrianById(par.id);
    if (response) {
      setAntrian(response);
    }
  };
  useEffect(() => {
    updateAntrian();
  }, []);
  return (
    <div className="max-w-[400px] border rounded mx-auto mt-12 shadow-md">
      <div className="w-full p-4 bg-white">
        <p className="text-center font-bold text-lg">Klinik Dr Hema Malini</p>
      </div>
      <div className="w-full p-4 h-[200px] bg-slate-950 flex justify-center items-center">
        <p className="font-bold text-5xl text-white">
          {antrian?.noAntrian ?? ""}
        </p>
      </div>
      <div className="w-full p-4 text-center font-bold text-xl">
        {antrian && format(antrian.jadwal.tanggal, "dd MMM yyyy")}{" "}
        {antrian && antrian.jam}
      </div>
      <div className="w-full p-4 bg-slate-950 text-white text-center">
        Tunjukan ketika melakukan pemeriksaan
      </div>
    </div>
  );
};

export default DetailAntrian;
