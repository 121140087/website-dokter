"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  GolonganDarah,
  JenisKelamin,
  Pasien,
  StatusPasien,
} from "@prisma/client";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { pasienFormSchema } from "@/lib/definitions/schemas";
import { toast } from "sonner";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { getPasienByNIK } from "../../../../../actions/getPasienByNIK";
import { getCurrentAntrian } from "@/actions/getCurrentAntrian";
import Link from "next/link";

const PasienDetail = () => {
  const [pasien, setPasien] = useState<Pasien | null>();
  const [tanggalLahir, setTanggalLahir] = useState<Date | undefined>(
    new Date()
  );

  const router = useRouter();

  const form = useForm<z.infer<typeof pasienFormSchema>>({
    resolver: zodResolver(pasienFormSchema),
    defaultValues: {
      alamat: "",
      nama: "",
      nik: "",
      noHp: "",
    },
  });
  async function onSubmit(values: z.infer<typeof pasienFormSchema>) {}

  const updateCurrentPasien = async () => {
    toast("Mendapatkan data pasien");
    const currentAntrian = await getCurrentAntrian();
    if (!currentAntrian) {
      toast("Tidak ada pasien untuk diperiksa");
      return;
    }
    const response = await getPasienByNIK(currentAntrian!.pasienNIK);

    if (response) {
      setPasien(response);
      response.nik && form.setValue("nik", response.nik);
      response.nama && form.setValue("nama", response.nama);
      response.golonganDarah &&
        form.setValue("GolonganDarah", response.golonganDarah);
      response.jenisKelamin &&
        form.setValue("JenisKelamin", response.jenisKelamin);
      response.noHp && form.setValue("noHp", response.noHp);
      response.status && form.setValue("status", response.status);
      response.tanggalLahir &&
        form.setValue("tanggalLahir", response.tanggalLahir);
      response.tanggalLahir && setTanggalLahir(response.tanggalLahir);
      response.alamat && form.setValue("alamat", response.alamat);
      setPasien(response);
      toast("Data ditemukan");
    } else {
      toast("Tidak ada pasien untuk diperiksa");
    }
  };
  useEffect(() => {
    updateCurrentPasien();
  }, []);
  return (
    <div className=" flex gap-x-4">
      <div className="w-full p-4 rounded shadow-md ">
        <h1 className="font-bold text-2xl">Pasien Saat Ini</h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4"
          >
            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="nama"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Nama</FormLabel>
                      <FormControl>
                        <Input placeholder="Nama" disabled {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="nik"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>NIK</FormLabel>
                      <FormControl>
                        <Input placeholder="NIK" disabled {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="alamat"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Alamat</FormLabel>
                      <FormControl>
                        <Input placeholder="Alamat" disabled {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="noHp"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>No Hp</FormLabel>
                      <FormControl>
                        <Input placeholder="no hp" disabled {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="JenisKelamin"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Jenis Kelamin</FormLabel>
                      <FormControl>
                        <Select
                          disabled
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Jenis Kelamin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={JenisKelamin.LAKILAKI}>
                              Laki Laki
                            </SelectItem>
                            <SelectItem value={JenisKelamin.PEREMPUAN}>
                              Perempuan
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
                name="GolonganDarah"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Golongan Darah</FormLabel>
                      <FormControl>
                        <Select
                          disabled
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Golongan Darah" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={GolonganDarah.A}>A</SelectItem>
                            <SelectItem value={GolonganDarah.AB}>AB</SelectItem>
                            <SelectItem value={GolonganDarah.B}>B</SelectItem>
                            <SelectItem value={GolonganDarah.O}>O</SelectItem>
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
                name="status"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Select
                          disabled
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={StatusPasien.LAJANG}>
                              Lajang
                            </SelectItem>
                            <SelectItem value={StatusPasien.MENIKAH}>
                              Sudah Menikah
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
                name="tanggalLahir"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Tanggal Lahir</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              disabled
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !tanggalLahir && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {tanggalLahir ? (
                                format(tanggalLahir, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={tanggalLahir}
                              onSelect={(val) => {
                                field.onChange(val);
                                setTanggalLahir(val);
                              }}
                              initialFocus
                              captionLayout="dropdown"
                              defaultMonth={new Date()}
                              fromMonth={new Date(1930, 1)}
                              toMonth={new Date()}
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <Button className="w-fit" disabled={!pasien}>
              <Link href={"/dashboard/pemeriksaan/create/" + pasien?.nik}>
                Periksa
              </Link>
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PasienDetail;
