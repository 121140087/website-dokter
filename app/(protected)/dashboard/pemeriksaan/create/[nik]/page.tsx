"use client";
import PemeriksaanForm from "./_components/PemeriksaanForm";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Obat } from "@prisma/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { pemeriksaanFormSchema } from "@/lib/definitions/schemas";
import { z } from "zod";
import ResepForm from "./_components/ResepForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { redirect } from "next/navigation";
import { createPemeriksaan } from "../../_actions/createPemeriksaan";

const PemeriksaanDetailPage = ({
  params,
}: {
  params: Promise<{ nik: string }>;
}) => {
  const [resep, setResep] = useState<{ obat: Obat; jumlah: number }[]>([]);
  const onResepChangeHandler = (resep: { obat: Obat; jumlah: number }[]) => {
    console.log(resep);
    setResep(resep);
  };
  const createPemeriksaanHandler = async (
    values: z.infer<typeof pemeriksaanFormSchema>
  ) => {
    toast("Menyimpan data pemeriksaan");
    try {
      // [TODO] : Ganti NIK
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
