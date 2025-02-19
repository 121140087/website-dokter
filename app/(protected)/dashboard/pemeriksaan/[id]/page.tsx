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
import { Obat, Pemeriksaan } from "@prisma/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { createPemeriksaan } from "../_actions/createPemeriksaan";
import { pemeriksaanFormSchema } from "@/lib/definitions/schemas";
import { z } from "zod";
import ResepForm from "./_components/ResepForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { redirect } from "next/navigation";
import { getPemeriksaanById } from "../_actions/getPemeriksaanById";

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
  const updateData = async () => {
    const id = (await params).id;
    const pemeriksaan = await getPemeriksaanById(id);
    setPemeriksaan(pemeriksaan);
    const tempResep: { obat: Obat; jumlah: number }[] = [];
    pemeriksaan?.resepObat.forEach((r) => {
      tempResep.push({
        obat: r.obat,
        jumlah: r.jumlah,
      });
    });
    setResep(tempResep);
  };
  const createPemeriksaanHandler = async (
    values: z.infer<typeof pemeriksaanFormSchema>
  ) => {
    toast("Menyimpan data pemeriksaan");
    try {
      const id = (await params).id;

      toast("Berhasil menyimpan data pemeriksaan");
      redirect("/dashboard/pemeriksaan");
    } catch (error) {
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
  useEffect(() => {
    updateData();
  }, []);
  return (
    <div className="p-4 flex flex-col gap-y-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(createPemeriksaanHandler)}
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
