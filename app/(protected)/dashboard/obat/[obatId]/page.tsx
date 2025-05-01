"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { GolonganObat } from "@prisma/client";
import { SelectValue } from "@radix-ui/react-select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createObat } from "../_actions/createObat";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getObat } from "../_actions/getObat";
import { useEffect, useState } from "react";
import { updateObat } from "../_actions/updateObat";

const EditObat = ({ params }: { params: Promise<{ obatId: string }> }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const obatFormSchema = z.object({
    nama: z.string().min(1),
    stok: z.coerce.number(),
    harga: z.coerce.number(),
    golongan: z.enum([
      "BEBAS",
      "BEBAS_TERBATAS",
      "KERAS",
      "NARKOTIKA",
      "FITOMARKA",
      "JAMU",
      "HERBAL",
    ]),
    deskripsi: z.string().min(1),
    aturanPakai: z.string(),
  });
  const form = useForm<z.infer<typeof obatFormSchema>>({
    resolver: zodResolver(obatFormSchema),
    defaultValues: {
      aturanPakai: "",
      deskripsi: "",
      harga: 0,
      nama: "",
      stok: 0,
    },
  });
  const updateValue = async () => {
    const obatId = (await params).obatId;
    const response = await getObat(obatId);
    if (response) {
      form.setValue("nama", response.nama);
      form.setValue("stok", response.stok);
      form.setValue("harga", response.harga);
      form.setValue("golongan", response.golongan);
      form.setValue("deskripsi", response.deskripsi);
      form.setValue("aturanPakai", response.aturanPakai);
    } else {
      toast("obat tidak ditemukan");
      router.push("/dashboard/obat");
    }
    setIsLoading(false);
  };
  async function onSubmit(values: z.infer<typeof obatFormSchema>) {
    const obatId = (await params).obatId;
    await updateObat({
      id: obatId,
      nama: values.nama,
      aturanPakai: values.aturanPakai,
      deskripsi: values.deskripsi,
      golongan: GolonganObat[values.golongan],
      harga: values.harga,
      stok: values.stok,
    });
    toast("Berhasil Mengubah obat");
    router.push("/dashboard/obat");
  }
  useEffect(() => {
    updateValue();
  }, []);
  return (
    <div className="p-4">
      <div className="rounded shadow p-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nama"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Nama</FormLabel>
                      <FormControl>
                        <Input placeholder="nama" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="golongan"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Gologan</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          disabled={isLoading}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Golongan" {...field} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={GolonganObat.BEBAS}>
                              Bebas
                            </SelectItem>
                            <SelectItem value={GolonganObat.BEBAS_TERBATAS}>
                              Bebas Terbatas
                            </SelectItem>
                            <SelectItem value={GolonganObat.FITOMARKA}>
                              Fitomarka
                            </SelectItem>
                            <SelectItem value={GolonganObat.HERBAL}>
                              Herbal
                            </SelectItem>
                            <SelectItem value={GolonganObat.JAMU}>
                              Jamu
                            </SelectItem>
                            <SelectItem value={GolonganObat.KERAS}>
                              Keras
                            </SelectItem>
                            <SelectItem value={GolonganObat.NARKOTIKA}>
                              Narkotika
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="stok"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Stok</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          type="number"
                          placeholder="stok"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="harga"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Harga</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          type="number"
                          placeholder="harga"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="deskripsi"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Deskripsi</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={10}
                          disabled={isLoading}
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="aturanPakai"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Aturan Pakai</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={10}
                          disabled={isLoading}
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <Button disabled={isLoading} className="w-fit">
              Update
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditObat;
