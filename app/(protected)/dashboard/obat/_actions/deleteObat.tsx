"use server";

import { prisma } from "@/prisma";

export const deleteObat = async (id: string) => {
  try {
    await prisma.obat.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return;
  }
};
