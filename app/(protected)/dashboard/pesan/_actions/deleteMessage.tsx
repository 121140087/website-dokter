"use server";

import { prisma } from "@/prisma";
import { Chat } from "@prisma/client";

export const deleteMessage = async (chat: Chat) => {
  await prisma.chat.delete({
    where: {
      id: chat.id,
    },
  });
};
