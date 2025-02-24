"use server";

import { prisma } from "@/prisma";

export const updateJamBuka = async ({
  id,
  startTime,
  endTime,
  jumlahAntrian,
}: {
  id: string;
  startTime: string;
  endTime: string;
  jumlahAntrian: number;
}) => {
  await prisma.jamBuka.update({
    where: {
      id,
    },
    data: {
      startTime,
      endTime,
      jumlahAntrian,
    },
  });
};
