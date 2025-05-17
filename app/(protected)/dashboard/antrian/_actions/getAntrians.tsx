"use server";
import { prisma } from "@/prisma";
export const getAntrians = async () => {
  const currentDate = new Date();
  try {
    // const response = await prisma.jadwal.findFirst({
    //   where: {
    //     tanggal: {
    //       gte: new Date(
    //         currentDate.getFullYear(),
    //         currentDate.getMonth(),
    //         currentDate.getDate(),
    //         0,
    //         0,
    //         0,
    //         0
    //       ),
    //       lte: new Date(
    //         currentDate.getFullYear(),
    //         currentDate.getMonth(),
    //         currentDate.getDate(),
    //         23,
    //         59,
    //         59,
    //         999
    //       ),
    //     },
    //   },
    //   include: {
    //     Antrian: {
    //       orderBy: {
    //         noAntrian: "asc",
    //       },
    //     },
    //   },
    // });
    // return response?.Antrian ?? [];
    return prisma.antrian.findMany({
      orderBy: {
        noAntrian: "asc",
      },
      include: {
        jadwal: {},
      },
    });
  } catch (error) {
    return [];
  }
};
