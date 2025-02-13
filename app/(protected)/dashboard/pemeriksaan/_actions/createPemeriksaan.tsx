"use server";

import { auth } from "@/auth";
import { pemeriksaanFormSchema } from "@/lib/definitions/schemas";
import { prisma } from "@/prisma";
import { Obat } from "@prisma/client";
import { z } from "zod";
import { createResep } from "./createResep";

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
    console.log(pemeriksaan);
    const response = await prisma.pemeriksaan.create({
      data: {
        detakJantung: pemeriksaan.detakJantung,
        diagnosis: pemeriksaan.diagnosis,
        gulaDarah: pemeriksaan.gulaDarah,
        tekananDarahTDS: pemeriksaan.tekananDarahTDS,
        tekananDarahTTD: pemeriksaan.tekananDarahTTD,
        trombosit: pemeriksaan.trombosit,
        pasienNik: pasienNIK,
        dokterId: user.id!,
      },
    });
    console.log(response);
    if (response) {
      await createResep({
        pemeriksaanId: response.id,
        resep,
      });
    }
  }
};
