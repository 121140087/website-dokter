"use server";
import { prisma } from "@/prisma";
import { Obat } from "@prisma/client";

interface CreateResepProps {
  resep: { obat: Obat; jumlah: number }[];
  pemeriksaanId: string;
}
export const createResep = async ({
  resep,
  pemeriksaanId,
}: CreateResepProps) => {
  var totalHarga = 0;
  resep.forEach((r) => {
    totalHarga += r.jumlah * r.obat.harga;
  });
  const resepResponse = await prisma.resep.create({
    data: {
      pemeriksaanId,
      totalHarga: totalHarga,
    },
  });
  if (resepResponse) {
    console.log(resepResponse);
    resep.forEach(async (r) => {
      await prisma.resepObat.create({
        data: {
          jumlah: r.jumlah,
          obatId: r.obat.id,
          resepId: resepResponse.id,
        },
      });
    });
  }
};
