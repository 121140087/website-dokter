"use server";
import { auth } from "@/auth";
import { prisma } from "@/prisma";

export const setOnlineStatus = async (status: boolean) => {
  const session = await auth();
  const id = session?.user.id;
  if (!id) return;
  await prisma.user.update({
    where: { id },
    data: { isOnline: status },
  });
};
