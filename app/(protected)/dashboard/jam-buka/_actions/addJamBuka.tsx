"use server";

import { prisma } from "@/prisma";
import { StatusKlinik } from "@prisma/client";

export const addJamBuka = async (key: number) => {
  await prisma.jamBuka.create({
    data: {
      key,
      startTime: "08:00",
      endTime: "16:00",
    },
  });
};
