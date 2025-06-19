"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { pemeriksaanFormSchema } from "@/lib/definitions/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Obat, Pemeriksaan } from "@prisma/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { getPemeriksaanById } from "../_actions/getPemeriksaanById";
import { updatePemeriksaan } from "../_actions/updatePemeriksaan";
import PemeriksaanForm from "./_components/PemeriksaanForm";
import ResepForm from "./_components/ResepForm";

const PemeriksaanDetailPage = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const [resep, setResep] = useState<{ obat: Obat; jumlah: number }[]>([]);
  const [pemeriksaan, setPemeriksaan] = useState<
    Pemeriksaan | undefined | null
  >();
  const onResepChangeHandler = (resep: { obat: Obat; jumlah: number }[]) => {
    setResep(resep);
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
  const updateData = async () => {
    const id = (await params).id;
    const pemeriksaan = await getPemeriksaanById(id);
    setPemeriksaan(pemeriksaan);
    if (pemeriksaan) {
      form.setValue("detakJantung", pemeriksaan.detakJantung);
      form.setValue("diagnosis", pemeriksaan.diagnosis);
      form.setValue("gulaDarah", pemeriksaan.gulaDarah);
      form.setValue("tekananDarahTDS", pemeriksaan.tekananDarahTDS);
      form.setValue("tekananDarahTTD", pemeriksaan.tekananDarahTTD);
      form.setValue("hargaPemeriksaan", pemeriksaan.hargaPemeriksaan);
      form.setValue("trombosit", pemeriksaan.trombosit);
      form.setValue("suhu", pemeriksaan.suhu);
      form.setValue("tinggiBadan", pemeriksaan.tinggiBadan);
    }
    const tempResep: { obat: Obat; jumlah: number }[] = [];
    pemeriksaan?.resepObat.forEach((r) => {
      tempResep.push({
        obat: r.obat,
        jumlah: r.jumlah,
      });
    });
    setResep(tempResep);
  };
  const updatePemeriksaanHandler = async (
    values: z.infer<typeof pemeriksaanFormSchema>
  ) => {
    toast("Menyimpan data pemeriksaan");
    if (!pemeriksaan) {
      return;
    }
    try {
      const id = (await params).id;
      await updatePemeriksaan({
        id,
        resep,
        pemeriksaan: values,
        currentPemeriksaan: pemeriksaan,
      });
      toast("Berhasil menyimpan data pemeriksaan");
      window.location.replace("/dashboard/pemeriksaan");
    } catch (error) {
      console.log(error);
      toast("Gagal menyimpan data pemeriksaan");
    }
  };

  useEffect(() => {
    updateData();
  }, []);
  return (
    <div className="p-4 flex flex-col gap-y-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(updatePemeriksaanHandler)}
          className="flex flex-col gap-y-4"
        >
          <div className="w-full p-4 rounded shadow flex justify-between items-center">
            <h1 className="font-bold text-xl">Pemeriksaan Pasien</h1>
            <Button type="submit">Update</Button>
          </div>
          <div className="grid grid-cols-2 gap-4 p-4 rounded shadow">
            <PemeriksaanForm form={form} />
            <ResepForm onResepChange={onResepChangeHandler} resep={resep} />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PemeriksaanDetailPage;
