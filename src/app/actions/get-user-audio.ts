"use server";

import { prisma } from "@/services/database";
import { ensureUserAuthenticated } from "./ensure-user-authenticated";

export async function getUserAudio() {
  const { session } = await ensureUserAuthenticated();

  if (!session.id) {
    throw new Error("You are not signed in. Please log in and try again.");
  }

  const audios = await prisma.audio.findMany({
    where: {
      userId: session.id,
      deletedAt: null,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return audios;
}
