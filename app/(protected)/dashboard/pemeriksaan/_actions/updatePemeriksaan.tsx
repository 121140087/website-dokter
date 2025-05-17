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
        totalHarga: pemeriksaan.hargaPemeriksaan + currentPemeriksaan.hargaResep,
      },
    });
    return;
  } catch (error) {
    console.log(error);
    return {
      error: "Gagal Mengupdate Pemeriksaan",
    };
  }
};
