import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { updatePasien } from "@/actions/updatePasien";
import {
  GolonganDarah,
  JenisKelamin,
  Pasien,
  StatusPasien,
  User,
} from "@prisma/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { createPasien } from "../../_actions/createPasien";
import { getPasienByNIK } from "../../../../../../actions/getPasienByNIK";

const PasienForm = () => {
  const userFormSchema = z.object({
    nama: z.string().min(1),
    nik: z.string().min(16).max(16),
    status: z.string().min(1),
    GolonganDarah: z.string().min(1),
    JenisKelamin: z.string().min(1),
    tanggalLahir: z.date(),
    alamat: z.string().min(1),
    noHp: z.string().min(1),
  });
  const [isNIKChecked, setIsNIKChecked] = useState(false);
  const [tanggalLahir, setTanggalLahir] = useState<Date | undefined>(
    new Date()
  );
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
  });
  const router = useRouter();
  const updateCurrentPasien = async () => {
    toast("Mendapatkan data pasien");
    if (form.getValues("nik").length != 16) {
      form.setError("nik", {
        message: "NIK harus berjumlah 16 karakter",
      });
      return;
    }
    form.clearErrors();

    const response = await getPasienByNIK(form.getValues("nik"));

    if (response) {
      toast("NIK sudah terdaftar");
      setIsNIKChecked(false);
    } else {
      toast("NIK belum terdaftar");
      setIsNIKChecked(true);
    }
  };
  async function onSubmit(values: z.infer<typeof userFormSchema>) {
    if (!tanggalLahir) {
      form.setError("tanggalLahir", {
        message: "Tanggal lahir tidak boleh kosong",
      });
      return;
    }
    toast("Menambahkan Pasien");
    try {
      await createPasien({
        nik: values.nik,
        nama: values.nama,
        golonganDarah: GolonganDarah[values.GolonganDarah],
        alamat: values.alamat,
        jenisKelamin: JenisKelamin[values.JenisKelamin],
        noHp: values.noHp,
        status: StatusPasien[values.status],
        tanggalLahir: tanggalLahir,
      } as Pasien);
      toast("Berhasil menambahkan Pasien");
      router.push("/dashboard/pasien");
    } catch (error) {
      toast("Gagal menambahkan Pasien");
    }
  }
  return (
    <div className="w-full p-4 rounded shadow-md ">
      <h1 className="font-bold text-2xl">Data Pasien</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
        >
          <div className="grid grid-cols-2 gap-2 items-end">
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
            <Button
              type="button"
              className="w-fit"
              onClick={updateCurrentPasien}
            >
              Cek Data Pasien
            </Button>
            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Nama</FormLabel>
                    <FormControl>
                      <Input
                        disabled={!isNIKChecked}
                        placeholder="Nama"
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
              name="alamat"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Alamat</FormLabel>
                    <FormControl>
                      <Input
                        disabled={!isNIKChecked}
                        placeholder="Alamat"
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
              name="noHp"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>No Hp</FormLabel>
                    <FormControl>
                      <Input
                        disabled={!isNIKChecked}
                        placeholder="no hp"
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
              name="JenisKelamin"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Jenis Kelamin</FormLabel>
                    <FormControl>
                      <Select
                        disabled={!isNIKChecked}
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
                        disabled={!isNIKChecked}
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
                        disabled={!isNIKChecked}
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
                            disabled={!isNIKChecked}
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
          <Button className="w-fit">Menambahkan Pasien</Button>
        </form>
      </Form>
    </div>
  );
};

export default PasienForm;
