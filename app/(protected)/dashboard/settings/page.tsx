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
import { useForm } from "react-hook-form";
import { z } from "zod";

const SettingsPage = () => {
  const passwordSchema = z.object({
    currentPassword: z.string().min(6, "password minimal 6 karakter"),
    newPassword: z.string().min(6, "password minimal 6 karakter"),
    confirmPassword: z.string().min(6, "password minimal 6 karakter"),
  });
  const profileSchema = z.object({
    nama: z.string().min(1, "Nama tidak boleh kosong"),
  });
  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const onAccountSubmit = (values: z.infer<typeof passwordSchema>) => {
    console.log(values);
  };
  return (
    <div className="flex flex-col gap-y-8 p-8">
      <div className="w-full p-4 rounded-md shadow flex flex-col gap-y-4s">
        <h2 className="text-xl font-bold">Profil</h2>
      </div>
      <div className="w-full p-4 rounded-md shadow flex flex-col gap-y-4s">
        <h2 className="text-xl font-bold">Ganti Password</h2>
        <Form {...passwordForm}>
          <form
            onSubmit={passwordForm.handleSubmit(onAccountSubmit)}
            className="flex flex-col space-y-4 max-w-2xl"
          >
            <FormField
              control={passwordForm.control}
              name="currentPassword"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Password Saat Ini</FormLabel>
                    <FormControl>
                      <Input placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={passwordForm.control}
              name="newPassword"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Password Baru</FormLabel>
                    <FormControl>
                      <Input placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={passwordForm.control}
              name="confirmPassword"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Konfirmasi Password</FormLabel>
                    <FormControl>
                      <Input placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button className="w-fit">Ganti Password</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SettingsPage;
