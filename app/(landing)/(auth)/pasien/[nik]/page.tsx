"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
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
import { createPasienSchema } from "@/lib/definitions/schemas";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { GolonganDarah, JenisKelamin, StatusPasien } from "@prisma/client";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const UserCreatePage = ({ params }: { params: { nik: string } }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<String | undefined>();
  const [date, setDate] = useState<Date>();

  const form = useForm<z.infer<typeof createPasienSchema>>({
    resolver: zodResolver(createPasienSchema),
    defaultValues: {
      golonganDarah: "",
      tanggalLahir: new Date(),
      alamat: "",
      noHp: "",
      jenisKelamin: "",
      status: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof createPasienSchema>) => {
    setError(undefined);
    setIsLoading(true);
    try {
    } catch (error) {
      setError("Terjadi Kesalahan");
    }
    setIsLoading(false);
  };
  return (
    <div>
      <div className="h-full w-full flex justify-center">
        <Card className="max-w-xl w-full mt-20 mb-12">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Data Diri</CardTitle>

            <CardDescription className="text-center">
              Lengkapi Data Diri Anda
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="alamat"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Alamat</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="alamat"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormDescription>
                          Jl Rambutan no.4 desa x kecamatan x
                        </FormDescription>
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
                        <FormLabel>Nomor Hp</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="No Hp"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormDescription>Contoh 08xxxxx</FormDescription>
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
                                <CalendarIcon className="mr-2 h-4 w-4" />
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
                                captionLayout="dropdown"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                                required
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="jenisKelamin"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Jenis Kelamin</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
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
                  name="golonganDarah"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Golongan Darah</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Golongan Darah" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value={GolonganDarah.A}>A</SelectItem>
                              <SelectItem value={GolonganDarah.AB}>
                                AB
                              </SelectItem>
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
                            onValueChange={field.onChange}
                            defaultValue={field.value}
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

                <p className="text-red-500">{error}</p>
                <Button className="w-full" disabled={isLoading}>
                  Simpan
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserCreatePage;
