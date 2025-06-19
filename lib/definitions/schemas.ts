import { z } from "zod";
export const loginSchema = z.object({
  email: z.string().email("masukkan email dengan benar"),
  password: z.string().min(1, "password tidak boleh kosong"),
});
export const registerSchema = z.object({
  nama: z.string().min(1, "nama tidak boleh kosong"),
  nik: z
    .string()
    .min(16, "NIK harus berjumlah 16 angka")
    .max(16, "NIK harus berjumlah 16 angka"),
  email: z.string().email("masukkan email dengan benar"),
  password: z.string().min(6, "password minimal 6 karakter"),
});
export const createPasienSchema = z.object({
  golonganDarah: z.string().min(1),
  tanggalLahir: z.date(),
  alamat: z.string().min(1),
  noHp: z.string().min(1),
  jenisKelamin: z.string().min(1),
  status: z.string().min(1),
});
export const antrianFormSchema = z.object({
  nama: z.string().min(1),
  nik: z.string().min(16).max(16),
  status: z.enum(["LAJANG", "MENIKAH"]),
  GolonganDarah: z.enum(["A", "B", "AB", "O"]),
  JenisKelamin: z.enum(["LAKILAKI", "PEREMPUAN"]),
  tanggalLahir: z.date(),
  alamat: z.string().min(1),
  noHp: z.string().min(1),
  keluhan: z.string().min(1),
});
export const pasienFormSchema = z.object({
  nama: z.string().min(1),
  nik: z.string().min(16).max(16),
  status: z.enum(["LAJANG", "MENIKAH"]),
  GolonganDarah: z.enum(["A", "B", "AB", "O"]),
  JenisKelamin: z.enum(["LAKILAKI", "PEREMPUAN"]),
  tanggalLahir: z.date(),
  alamat: z.string().min(1),
  noHp: z.string().min(1),
});
export const pemeriksaanFormSchema = z.object({
  diagnosis: z.string().min(1),
  detakJantung: z.coerce.number(),
  gulaDarah: z.coerce.number(),
  trombosit: z.coerce.number(),
  tekananDarahTDS: z.coerce.number(),
  tekananDarahTTD: z.coerce.number(),
  hargaPemeriksaan: z.coerce.number(),
  suhu: z.coerce.number(),
  tinggiBadan: z.coerce.number(),
});
