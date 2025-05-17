"use server";

import { auth } from "@/auth";
import { pemeriksaanFormSchema } from "@/lib/definitions/schemas";
import { prisma } from "@/prisma";
import { Obat, StatusAntrian } from "@prisma/client";
import { z } from "zod";

interface CreatePemeriksaanProps {
  pemeriksaan: z.infer<typeof pemeriksaanFormSchema>;
  resep: { obat: Obat; jumlah: number }[];
  pasienNIK: string;
}
export const createPemeriksaan = async ({
  pemeriksaan,
  resep,
  pasienNIK,
}: CreatePemeriksaanProps) => {
  const session = await auth();
  const user = session?.user;
  if (user) {
    let totalHarga = 0;
    const postedResep: { jumlah: number; obatId: string }[] = [];

    resep.forEach(async (r) => {
      totalHarga += r.jumlah * r.obat.harga;
      postedResep.push({
        jumlah: r.jumlah,
        obatId: r.obat.id,
      });
      await prisma.obat.update({
        where: {
          id: r.obat.id,
        },
        data: {
          stok: r.obat.stok - r.jumlah,
        },
      });
    });
    const response = await prisma.pemeriksaan.create({
      data: {
        detakJantung: pemeriksaan.detakJantung,
        diagnosis: pemeriksaan.diagnosis,
        gulaDarah: pemeriksaan.gulaDarah,
        tekananDarahTDS: pemeriksaan.tekananDarahTDS,
        tekananDarahTTD: pemeriksaan.tekananDarahTTD,
        trombosit: pemeriksaan.trombosit,
        pasienNik: pasienNIK,
        totalHarga: pemeriksaan.hargaPemeriksaan + totalHarga,
        hargaPemeriksaan: pemeriksaan.hargaPemeriksaan,
        hargaResep: totalHarga,
        dibayar: false,
        resepObat: {
          createMany: {
            data: postedResep,
          },
        },
        dokterId: user.dokterId!,
      },
    });
    const antrian = await prisma.antrian.findFirst({
      where: {
        pasienNIK,
        statusAntrian: StatusAntrian.SEDANG_DIPERIKSA,
      },
    });
    if (antrian) {
      await prisma.antrian.update({
        where: {
          id: antrian.id,
        },
        data: {
          statusAntrian: StatusAntrian.SELESAI_DIPERIKSA,
        },
      });
    }
  }
};
