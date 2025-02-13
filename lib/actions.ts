"use server";
import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { ChatRole, User } from "@prisma/client";
import { Message } from "ai";

export async function getUserByEmail(email: string): Promise<User | undefined> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) return undefined;
    return user;
  } catch (error) {
    throw new Error("Something went wrong");
  }
}
export async function saveChat({
  text,
  chatRole,
  userId,
}: {
  text: string;
  chatRole: ChatRole;
  userId?: string;
}) {
  if (text.length <= 0 || !text) {
    return;
  }
  const session = await auth();
  const user = session?.user;
  if (user) {
    const chatRoom = await prisma.chatRoom.findUnique({
      where: {
        id: userId ?? user.id,
      },
    });
    if (!chatRoom) {
      await prisma.chatRoom.create({
        data: {
          id: userId ?? user.id!,
          nama: user.name!,
        },
      });
    }
    const response = await prisma.chat.create({
      data: {
        role: chatRole,
        message: text,
        userId: userId ?? user.id!,
      },
    });
    await prisma.chatRoom.update({
      data: {
        lastMessage: text,
        lastChatRole: chatRole,
        updatedAt: new Date(),
        unreadMessage: userId ? 0 : chatRoom ? chatRoom.unreadMessage + 1 : 1,
      },
      where: {
        id: userId ?? user.id,
      },
    });
  }
}
export async function getSavedChat() {
  const session = await auth();
  const user = session?.user;

  try {
    const response = await prisma.chat.findMany({
      where: {
        userId: user?.id,
      },
    });
    const result = response.map((m) => {
      return {
        id: m.id,
        role: m.role,
        createdAt: m.createdAt,
        content: m.message,
      } as Message;
    });
    return result;
  } catch (error) {
    return [];
  }
}
