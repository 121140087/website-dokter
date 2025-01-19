"use server";

import { prisma } from "@/prisma";
import { Pasien } from "@prisma/client";

export const updatePasien = async (pasien: Pasien) => {
  try {
    await prisma.pasien.update({
      where: {
        nik: pasien.nik,
      },
      data: {
        nama: pasien.nama,
        alamat: pasien.alamat,
        golonganDarah: pasien.golonganDarah,
        jenisKelamin: pasien.jenisKelamin,
        noHp: pasien.noHp,
        status: pasien.status,
        tanggalLahir: pasien.tanggalLahir,
        updatedAt: new Date(),
      },
    });
  } catch (error) {}
};
