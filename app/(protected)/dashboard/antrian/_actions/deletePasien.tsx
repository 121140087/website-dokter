"use server";

import { prisma } from "@/prisma";

export const deletePasien = async (id: string) => {
  await prisma.antrian.delete({
    where: {
      id,
    },
  });
};
