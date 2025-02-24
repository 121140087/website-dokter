"use server";

import { prisma } from "@/prisma";

export const deleteJamBuka = async (id: string) => {
  await prisma.jamBuka.delete({
    where: {
      id,
    },
  });
};
