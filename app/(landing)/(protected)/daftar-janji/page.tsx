"use client";
import { Antrian } from "@prisma/client";
import { useEffect, useState } from "react";
import { getJanji } from "./_actions/getJanji";
import { format } from "date-fns";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const DaftarJanjiPage = () => {
  const [janji, setJanji] = useState<Antrian[]>([]);
  const updateJanji = async () => {
    const response = await getJanji();
    if (response) {
      setJanji(response);
    }
  };
  useEffect(() => {
    updateJanji();
  }, []);
  return (
    <div className="px-8 md:px-16 lg:px-36 xl:px-52 2xl:px-96 mt-24">
      <h2 className="font-bold text-3xl text-center mb-12">Daftar Janji</h2>
      {!janji && <div className="text-center">Loading....</div>}
      {janji.length === 0 && (
        <div className="flex flex-col items-center">
          <div className="text-center text-lg my-6">
            Tidak ada janji yang dibuat
          </div>
          <Link href={"/buat-janji"}>
            <Button>Buat Janji</Button>
          </Link>
        </div>
      )}
      {janji && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {janji.map((j) => {
            return (
              <div
                key={j.id}
                className="w-full rounded border p-4 flex flex-col gap-y-3"
              >
                <p>
                  <b>Tanggal</b> : {format(j.createdAt, "dd MMM yyyy")}
                </p>
                <p className="font-bold">Keluhan</p>
                <p>{j.keluhan}</p>
                <p>No Antrian : {j.noAntrian}</p>
                <Link
                  className={cn("w-full", buttonVariants())}
                  href={`/antrian/${j.id}`}
                >
                  Lihat Kartu Antrian
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DaftarJanjiPage;
