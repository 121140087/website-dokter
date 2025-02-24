"use server";

import { prisma } from "@/prisma";
import { StatusKlinik } from "@prisma/client";

export const closeDate = async (date: Date, endDate: Date) => {
  const jadwal = await prisma.jadwal.findFirst({
    where: {
      tanggal: {
        gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
        lte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
      },
    },
  });
  console.log(date);
  console.log(jadwal);
  console.log(
    new Date(date.getFullYear(), date.getMonth(), date.getDate()).getDate()
  );
  console.log(date.getDate());
  console.log(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
  if (jadwal) {
    await prisma.jadwal.update({
      where: {
        id: jadwal.id,
      },
      data: {
        statusKlinik:
          jadwal.statusKlinik == StatusKlinik.TUTUP
            ? StatusKlinik.BUKA
            : StatusKlinik.TUTUP,
      },
    });
  } else {
    await prisma.jadwal.create({
      data: {
        jumlahAntrian: 0,
        statusKlinik: StatusKlinik.TUTUP,
        tanggal: date,
      },
    });
    console.log("Created");
  }
};
