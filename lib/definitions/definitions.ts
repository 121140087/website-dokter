import { z } from "zod";
import {
  GolonganDarah,
  JenisKelamin,
  StatusAntrian,
  StatusPasien,
} from "./enum";
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
export const registerSchema = z.object({
  nama: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});
export const User = z.object({
  id: z.string(),
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
});

export type Pasien = {
  id: String;
  nama: String;
  email: String;
  nik: String;
  status: StatusPasien;
  golonganDarah: GolonganDarah;
  jenisKelamin: JenisKelamin;
  tanggalLahir: String;
  alamat: String;
  noHp: String;
};
export type Antrian = {
  pasien: Pasien;
  statusAntrian: StatusAntrian;
  id: String;
};
