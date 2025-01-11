import { z } from "zod";
import {
  GolonganDarah,
  JenisKelamin,
  StatusAntrian,
  StatusPasien,
} from "./enum";
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
