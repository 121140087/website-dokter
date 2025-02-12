"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { pemeriksaanFormSchema } from "@/lib/definitions/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const PemeriksaanForm = () => {
  const form = useForm<z.infer<typeof pemeriksaanFormSchema>>({
    resolver: zodResolver(pemeriksaanFormSchema),
    defaultValues: {
      diagnosis: "",
    },
  });
  async function onSubmit(values: z.infer<typeof pemeriksaanFormSchema>) {}

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="detakJantung"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Detak Jantung</FormLabel>
                  <FormControl>
                    <Input placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="gulaDarah"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Gula Darah</FormLabel>
                  <FormControl>
                    <Input placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="tekananDarahTDS"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Tekanan Darah TDS</FormLabel>
                  <FormControl>
                    <Input placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="tekananDarahTTD"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Tekanan Darah TTD</FormLabel>
                  <FormControl>
                    <Input placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="trombosit"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Trombosit</FormLabel>
                  <FormControl>
                    <Input placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <FormField
          control={form.control}
          name="diagnosis"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Diagnosis</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Diagnosis"
                    {...field}
                    className="resize-none"
                    rows={5}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </form>
    </Form>
  );
};

export default PemeriksaanForm;
