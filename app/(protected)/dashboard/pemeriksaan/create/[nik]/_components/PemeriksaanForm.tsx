"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { pemeriksaanFormSchema } from "@/lib/definitions/schemas";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

const PemeriksaanForm = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof pemeriksaanFormSchema>>;
}) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="detakJantung"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Detak Jantung</FormLabel>
                <FormControl>
                  <Input placeholder="0" {...field} type="number" />
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
                  <Input placeholder="0" {...field} type="number" />
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
                  <Input placeholder="0" {...field} type="number" />
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
                  <Input placeholder="0" {...field} type="number" />
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
                  <Input placeholder="0" {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="suhu"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Suhu</FormLabel>
                <FormControl>
                  <Input placeholder="0" {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="tinggiBadan"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Tinggi Badan</FormLabel>
                <FormControl>
                  <Input placeholder="0" {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="beratBadan"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Berat Badan</FormLabel>
                <FormControl>
                  <Input placeholder="0" {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="hargaPemeriksaan"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Biaya Pemeriksaan</FormLabel>
                <FormControl>
                  <Input placeholder="0" {...field} type="number" />
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
    </>
  );
};

export default PemeriksaanForm;
