"use server";

import { prisma } from "@/prisma";

export const addJamBuka = async (key: number) => {
  await prisma.jamBuka.create({
    data: {
      key,
      startTime: "08:00",
      endTime: "16:00",
    },
  });
};
