"use server";

import { prisma } from "@/services/database";
import { ensureUserAuthenticated } from "./ensure-user-authenticated";

export async function getUserAudio() {
  const { session } = await ensureUserAuthenticated();

  const audios = await prisma.audio.findMany({
    where: {
      userId: session.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return audios;
}
