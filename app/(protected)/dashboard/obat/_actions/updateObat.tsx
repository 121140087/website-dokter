"use server";

import { prisma } from "@/prisma";
import { GolonganObat } from "@prisma/client";

interface UpdateObatProps {
  id: string;
  golongan: GolonganObat;
  stok: number;
  harga: number;
  deskripsi: string;
  aturanPakai: string;
  nama: string;
}

export const updateObat = async ({
  id,
  golongan,
  stok,
  nama,
  harga,
  deskripsi,
  aturanPakai,
}: UpdateObatProps) => {
  await prisma.obat.update({
    where: {
      id,
    },
    data: {
      golongan,
      nama,
      stok,
      harga,
      deskripsi,
      aturanPakai,
    },
  });
};
