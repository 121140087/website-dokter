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

const CreateObatPage = () => {
  const router = useRouter();

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
    sediaanObat: z.string(),
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
  async function onSubmit(values: z.infer<typeof obatFormSchema>) {
    await createObat({
      nama: values.nama,
      aturanPakai: values.aturanPakai,
      deskripsi: values.deskripsi,
      golongan: GolonganObat[values.golongan],
      harga: values.harga,
      stok: values.stok,
      sediaanObat: values.sediaanObat,
    });
    toast("Berhasil Menambahkan obat");
    router.push("/dashboard/obat");
  }
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
                name="sediaanObat"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Sediaan Obat</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue
                              placeholder="Sediaan Obat"
                              {...field}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={"Tablet"}>Tablet</SelectItem>
                            <SelectItem value={"Kapsul"}>Kapsul</SelectItem>
                            <SelectItem value={"Sirup"}>Sirup</SelectItem>
                            <SelectItem value={"Suspensi"}>Suspensi</SelectItem>
                            <SelectItem value={"Obat Oles"}>
                              Obat Oles
                            </SelectItem>
                            <SelectItem value={"Obat Tetes"}>
                              Obat Tetes
                            </SelectItem>
                            <SelectItem value={"Obat Suntik"}>
                              Obat Suntik
                            </SelectItem>
                            <SelectItem value={"Obat Inhaler"}>
                              Obat Inhaler
                            </SelectItem>
                            <SelectItem value={"Obat Tempel"}>
                              Obat Tempel
                            </SelectItem>
                            <SelectItem value={"Obat Sublingual"}>
                              Obat Sublingual
                            </SelectItem>
                            <SelectItem value={"Obat Supositoria"}>
                              Obat Supositoria
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
                        <Input type="number" placeholder="stok" {...field} />
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
                        <Input type="number" placeholder="harga" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <div></div>
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
            <Button className="w-fit">Tambahkan</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateObatPage;
