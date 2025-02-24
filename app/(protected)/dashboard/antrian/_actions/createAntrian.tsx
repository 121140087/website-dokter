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
      tanggal: {
        gte: new Date(
          tanggal.getFullYear(),
          tanggal.getMonth(),
          tanggal.getDate()
        ),
        lte: new Date(
          tanggal.getFullYear(),
          tanggal.getMonth(),
          tanggal.getDate()
        ),
      },
    },
  });
  if (!jadwal) {
    jadwal = await createJadwal(tanggal);
  }
  const jamBuka = await prisma.jamBuka.findMany({
    where: {
      key: tanggal.getDay(),
    },
  });
  if (!jamBuka) {
    return {
      error: "Tutup",
    };
  }
  var totalMaksimalAntrian = 0;
  for (let j of jamBuka) {
    totalMaksimalAntrian += j.jumlahAntrian;
    if (jadwal.jumlahAntrian < totalMaksimalAntrian) {
      await prisma.antrian.create({
        data: {
          keluhan: keluhan,
          noAntrian: jadwal.jumlahAntrian + 1,
          jadwalId: jadwal.id,
          pasienNIK: nik,
          nama: nama,
          statusAntrian: StatusAntrian.MENUNGGU,
          jam: j.startTime,
        },
      });
      break;
    }
  }

  await prisma.jadwal.update({
    where: {
      id: jadwal.id,
    },
    data: {
      jumlahAntrian: jadwal.jumlahAntrian + 1,
    },
  });
};
