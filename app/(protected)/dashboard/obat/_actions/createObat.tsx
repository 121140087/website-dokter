"use server";

import { prisma } from "@/prisma";
import { GolonganObat } from "@prisma/client";
interface CreateObatProps {
  nama: string;
  golongan: GolonganObat;
  stok: number;
  harga: number;
  deskripsi: string;
  aturanPakai: string;
}
export const createObat = async ({
  nama,
  golongan,
  stok,
  harga,
  deskripsi,
  aturanPakai,
}: CreateObatProps) => {
  await prisma.obat.create({
    data: {
      nama,
      golongan,
      stok,
      harga,
      deskripsi,
      aturanPakai,
    },
  });
};
