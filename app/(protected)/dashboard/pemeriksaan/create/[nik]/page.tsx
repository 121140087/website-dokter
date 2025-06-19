"use client";
import { Button } from "@/components/ui/button";
import PemeriksaanForm from "./_components/PemeriksaanForm";

import { Form } from "@/components/ui/form";
import { pemeriksaanFormSchema } from "@/lib/definitions/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Obat } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { createPemeriksaan } from "../../_actions/createPemeriksaan";
import ResepForm from "./_components/ResepForm";

const PemeriksaanDetailPage = ({
  params,
}: {
  params: Promise<{ nik: string }>;
}) => {
  const [resep, setResep] = useState<{ obat: Obat; jumlah: number }[]>([]);
  const onResepChangeHandler = (resep: { obat: Obat; jumlah: number }[]) => {
    setResep(resep);
  };
  const createPemeriksaanHandler = async (
    values: z.infer<typeof pemeriksaanFormSchema>
  ) => {
    toast("Menyimpan data pemeriksaan");
    try {
      const nik = (await params).nik;
      await createPemeriksaan({
        pasienNIK: nik,
        pemeriksaan: values,
        resep: resep,
      });
      toast("Berhasil menyimpan data pemeriksaan");
      window.location.replace("/dashboard/pemeriksaan");
      // redirect("/dashboard/pemeriksaan");
      return;
    } catch (error) {
      console.log(error);
      toast("Gagal menyimpan data pemeriksaan");
    }
  };
  const form = useForm<z.infer<typeof pemeriksaanFormSchema>>({
    resolver: zodResolver(pemeriksaanFormSchema),
    defaultValues: {
      diagnosis: "",
      detakJantung: 0,
      gulaDarah: 0,
      tekananDarahTDS: 0,
      tekananDarahTTD: 0,
      trombosit: 0,
      hargaPemeriksaan: 0,
      suhu: 0,
      tinggiBadan: 0,
    },
  });

  return (
    <div className="p-4 flex flex-col gap-y-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(createPemeriksaanHandler)}
          className="flex flex-col gap-y-4"
        >
          <div className="w-full p-4 rounded shadow flex justify-between items-center">
            <h1 className="font-bold text-xl">Pemeriksaan Pasien</h1>
            <Button type="submit">Selesai</Button>
          </div>
          <div className="grid grid-cols-2 gap-4 p-4 rounded shadow">
            <PemeriksaanForm form={form} />
            <ResepForm onResepChange={onResepChangeHandler} />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PemeriksaanDetailPage;
