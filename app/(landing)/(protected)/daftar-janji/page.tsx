"use client";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Antrian, Jadwal, StatusAntrian } from "@prisma/client";
import { format } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getJanji } from "./_actions/getJanji";

const DaftarJanjiPage = () => {
  const [janji, setJanji] = useState<(Antrian & { jadwal: Jadwal })[]>([]);
  const [loading, setLoading] = useState(true);

  const updateJanji = async () => {
    setLoading(true);
    const response = await getJanji();
    if (response) setJanji(response);
    setLoading(false);
  };

  useEffect(() => {
    updateJanji();
  }, []);

  return (
    <div className="px-6 md:px-16 lg:px-36 xl:px-52 2xl:px-96 mt-24">
      <h2 className="font-bold text-3xl text-center mb-12">Daftar Janji</h2>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="p-4 space-y-3">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-8 w-1/2 mt-2" />
            </Card>
          ))}
        </div>
      ) : janji.length === 0 ? (
        <div className="text-center space-y-4">
          <p className="text-lg text-muted-foreground">
            Belum ada janji yang dibuat.
          </p>
          <Link href="/buat-janji">
            <Button>Buat Janji Sekarang</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {janji.map((j) => (
            <Card key={j.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {format(j.jadwal.tanggal, "dd MMM yyyy")}
                  <Badge
                    variant={
                      j.statusAntrian === "MENUNGGU" ? "secondary" : "default"
                    }
                  >
                    {j.statusAntrian}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">
                    No. Antrian:
                  </span>{" "}
                  {j.noAntrian}
                </p>
                <div>
                  <p className="font-semibold mb-1">Keluhan:</p>
                  <p className="text-sm text-muted-foreground">{j.keluhan}</p>
                </div>
                {j.statusAntrian === StatusAntrian.MENUNGGU && (
                  <Link
                    href={`/antrian/${j.id}`}
                    className={cn(buttonVariants({ className: "mt-3 w-full" }))}
                  >
                    Lihat Kartu Antrian
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DaftarJanjiPage;
