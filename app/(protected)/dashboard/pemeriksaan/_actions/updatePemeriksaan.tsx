"use server";

import { pemeriksaanFormSchema } from "@/lib/definitions/schemas";
import { prisma } from "@/prisma";
import { Obat, Pemeriksaan } from "@prisma/client";
import { z } from "zod";

export const updatePemeriksaan = async ({
  id,
  resep,
  pemeriksaan,
  currentPemeriksaan,
}: {
  id: string;
  pemeriksaan: z.infer<typeof pemeriksaanFormSchema>;
  resep: { obat: Obat; jumlah: number }[];
  currentPemeriksaan: Pemeriksaan;
}) => {
  try {
    const totalHargaResep = resep.reduce(
      (acc, r) => acc + r.jumlah * r.obat.harga,
      0
    );
    await prisma.pemeriksaan.update({
      where: {
        id,
      },
      data: {
        detakJantung: pemeriksaan.detakJantung,
        diagnosis: pemeriksaan.diagnosis,
        gulaDarah: pemeriksaan.gulaDarah,
        tekananDarahTDS: pemeriksaan.tekananDarahTDS,
        tekananDarahTTD: pemeriksaan.tekananDarahTTD,
        hargaPemeriksaan: pemeriksaan.hargaPemeriksaan,
        totalHarga: pemeriksaan.hargaPemeriksaan + totalHargaResep,
      },
    });
    resep.forEach(async (r) => {
      await prisma.obat.update({
        where: {
          id: r.obat.id,
        },
        data: {
          stok: r.obat.stok - r.jumlah,
        },
      });
    });
    const postedResep: {
      jumlah: number;
      obatId: string;
      pemeriksaanId: string;
    }[] = [];
    resep.forEach((r) => {
      postedResep.push({
        jumlah: r.jumlah,
        obatId: r.obat.id,
        pemeriksaanId: id,
      });
    });
    await prisma.resepObat.deleteMany({
      where: {
        pemeriksaanId: id,
      },
    });
    await prisma.resepObat.createMany({
      data: postedResep,
    });

    return;
  } catch (error) {
    console.log(error);
    return {
      error: "Gagal Mengupdate Pemeriksaan",
    };
  }
};
