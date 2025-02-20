"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PasienForm from "./_components/PasienForm";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Form } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SetStateAction, useEffect, useState } from "react";
import { getJadwal } from "@/app/(protected)/dashboard/jadwal/_actions/getJadwal";
import { format } from "date-fns";
import { StatusKlinik } from "@prisma/client";
import { toast } from "sonner";
import { createAntrian } from "@/app/(protected)/dashboard/antrian/_actions/createAntrian";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getPasienByNIK } from "@/actions/getPasienByNIK";
import { redirect } from "next/dist/server/api-utils";
interface JadwalContent {
  start: string;
  end: string;
  overlap: boolean;
  display: string;
}
const BuatJanjiPage = () => {
  const [tab, setTab] = useState<"data-pasien" | "tanggal" | "keluhan">(
    "data-pasien"
  );
  const [tanggal, setTanggal] = useState<Date>();
  const [jadwal, setJadwal] = useState<JadwalContent[]>([]);
  const [keluhan, setKeluhan] = useState("");

  const updateJadwal = async () => {
    const response = await getJadwal();

    const mapped: SetStateAction<JadwalContent[]> = [];
    response.forEach((e) => {
      if (e.statusKlinik != StatusKlinik.BUKA) {
        mapped.push({
          start: format(e.tanggal, "yyyy-MM-dd"),
          end: format(e.tanggal, "yyyy-MM-dd"),
          overlap: false,
          display: "background",
        });
      }
    });
    setJadwal(mapped);
  };
  useEffect(() => {
    updateJadwal();
  }, []);
  const buatJanjiHandler = async () => {
    if (tanggal && keluhan) {
      const user = await getCurrentUser();
      const pasien = await getPasienByNIK(user!.nik!);

      await createAntrian({
        keluhan: keluhan,
        tanggal: tanggal,
        nama: pasien?.nama!,
        nik: user?.nik!,
      });
      window.location.replace("/daftar-janji");
    } else {
      toast("Data belum lengkap");
    }
  };
  return (
    <div>
      <Tabs
        className=" px-8 md:px-16 lg:px-36 xl:px-52 2xl:px-96 mt-32"
        value={tab}
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="data-pasien">Data Pasien</TabsTrigger>
          <TabsTrigger value="tanggal">Tanggal Janji</TabsTrigger>
          <TabsTrigger value="keluhan">Keluhan</TabsTrigger>
        </TabsList>
        <TabsContent value="data-pasien">
          <PasienForm
            onUpdate={() => {
              setTab("tanggal");
            }}
          />
        </TabsContent>
        <TabsContent value="tanggal">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={jadwal}
            dateClick={(info) => {
              if (
                jadwal.findIndex(
                  (j) => j.start === format(info.date, "yyyy-MM-dd")
                ) !== -1
              ) {
                toast(
                  "Klinik Tutup pada tanggal " + format(info.date, "yyyy-MM-dd")
                );
                return;
              }
              setTanggal(info.date);
              setTab("keluhan");
            }}
          />
        </TabsContent>
        <TabsContent value="keluhan">
          <Textarea
            placeholder="Tuliskan keluhan anda..."
            className="resize-none"
            rows={8}
            value={keluhan}
            onChange={(e) => {
              e.preventDefault();
              setKeluhan(e.currentTarget.value);
            }}
          />
          <Button onClick={buatJanjiHandler} className="mt-6 w-full">
            Buat Janji
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BuatJanjiPage;
