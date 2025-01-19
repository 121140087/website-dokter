"use server";

import { prisma } from "@/prisma";

export const getChats = async ({ userId }: { userId: string }) => {
  try {
    const response = await prisma.chat.findMany({
      where: {
        userId: userId,
      },
    });
    return response;
  } catch (error) {
    return [];
  }
};
