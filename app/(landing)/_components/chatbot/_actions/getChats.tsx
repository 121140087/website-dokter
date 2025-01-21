"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";

export const getChats = async () => {
  const session = await auth();
  if (session?.user) {
    const chats = await prisma.chat.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return chats;
  }
  return [];
};
