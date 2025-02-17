"use server";

import { auth } from "@/auth";
import { pemeriksaanFormSchema } from "@/lib/definitions/schemas";
import { prisma } from "@/prisma";
import { Obat } from "@prisma/client";
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
    var totalHarga = 0;
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
    console.log(totalHarga);
    const response = await prisma.pemeriksaan.create({
      data: {
        detakJantung: pemeriksaan.detakJantung,
        diagnosis: pemeriksaan.diagnosis,
        gulaDarah: pemeriksaan.gulaDarah,
        tekananDarahTDS: pemeriksaan.tekananDarahTDS,
        tekananDarahTTD: pemeriksaan.tekananDarahTTD,
        trombosit: pemeriksaan.trombosit,
        pasienNik: pasienNIK,
        totalHarga,
        resepObat: {
          createMany: {
            data: postedResep,
          },
        },
        dokterId: user.dokterId!,
      },
    });
    // if (response) {
    //   await createResep({
    //     pemeriksaanId: response.id,
    //     resep,
    //   });
    // }
  }
};
