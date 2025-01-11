"use server";

import { prisma } from "@/prisma";

export const getChatRooms = async () => {
  try {
    const response = await prisma.chatRoom.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });
    return response;
  } catch (error) {
    return [];
  }
};
