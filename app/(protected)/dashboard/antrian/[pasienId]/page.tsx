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
import { GolonganDarah, JenisKelamin, StatusPasien } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const getUser = async function () {
  return {
    nama: "Paduka",
    email: "paduka@gmail.com",
    nik: "1234567890123456",
    status: StatusPasien.LAJANG,
    GolonganDarah: GolonganDarah.AB,
    JenisKelamin: JenisKelamin.LAKILAKI,
    tanggalLahir: new Date("2003-08-09"),
    alamat: "Desa Kutorejo Kecamatan Kertosono",
    noHp: "085841142602",
  };
};

const PasienDetail = ({ params }: { params: { pasienId: string } }) => {
  const userFormSchema = z.object({
    nama: z.string().min(1),
    email: z.string().email(),
    nik: z.string().min(16).max(16),
    status: z.string().min(1),
    GolonganDarah: z.string().min(1),
    JenisKelamin: z.string().min(1),
    tanggalLahir: z.date(),
    alamat: z.string().min(1),
    noHp: z.string().min(1),
  });
  const [user, setUser] = useState({});
  const [date, setDate] = useState<Date>();
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: user,
  });
  function onSubmit(values: z.infer<typeof userFormSchema>) {
    console.log(values);
  }
  async function getUserData() {
    const userData = await getUser();
    setUser(userData);
  }
  useEffect(() => {}, []);
  return (
    <div className="p-4 flex gap-x-4">
      <div className="p-4 rounded shadow-md w-fit h-fit">
        <Image
          src={"/images/elon.jpg"}
          alt="avatar"
          width={"100"}
          height={"100"}
          className="w-[200px] aspect-square object-cover rounded"
        />
        <Button className="w-full mt-4">Ubah Gambar</Button>
      </div>
      <div className="w-full p-4 rounded shadow-md ">
        <h1 className="font-bold text-2xl">Data Pasien</h1>

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
                        <Input placeholder="Nama" {...field} />
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
                        <Input placeholder="NIK" {...field} />
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
                        <Input placeholder="Alamat" {...field} />
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
                        <Input placeholder="no hp" {...field} />
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
                        <Select>
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
                        <Select>
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
                        <Select>
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
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                              )}
                            >
                              {date ? (
                                format(date, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              initialFocus
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
            <Button className="w-fit">Update</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PasienDetail;
