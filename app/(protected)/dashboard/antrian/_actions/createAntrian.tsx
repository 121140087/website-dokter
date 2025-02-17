"use server";

import { prisma } from "@/prisma";
import { StatusAntrian, StatusKlinik } from "@prisma/client";
import { createJadwal } from "../../jadwal/_actions/createJadwal";

interface CreateAntrianProps {
  keluhan: string;
  tanggal: Date;
  nik: string;
  nama: string;
}

export const createAntrian = async ({
  keluhan,
  tanggal,
  nik,
  nama,
}: CreateAntrianProps) => {
  let jadwal = await prisma.jadwal.findFirst({
    where: {
      tanggal: tanggal,
    },
  });
  if (!jadwal) {
    jadwal = await createJadwal(tanggal);
  }
  if (jadwal.jumlahAntrian >= 12) {
    return;
  }
  await prisma.antrian.create({
    data: {
      keluhan: keluhan,
      noAntrian: jadwal.jumlahAntrian + 1,
      jadwalId: jadwal.id,
      pasienNIK: nik,
      nama: nama,
      statusAntrian: StatusAntrian.MENUNGGU,
    },
  });
  await prisma.jadwal.update({
    where: {
      id: jadwal.id,
    },
    data: {
      jumlahAntrian: jadwal.jumlahAntrian + 1,
    },
  });
};
