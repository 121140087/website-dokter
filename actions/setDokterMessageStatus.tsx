"use server";
import { auth } from "@/auth";
import { prisma } from "@/prisma";

export const setDokterStatusMessage = async (enable: boolean) => {
  const session = await auth();
  const id = session?.user.id;
  if (!id) return;
  await prisma.user.update({
    where: { id },
    data: { enableMessage: enable },
  });
};
