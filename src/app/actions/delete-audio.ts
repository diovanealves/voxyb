"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/services/database";
import { ensureUserAuthenticated } from "./ensure-user-authenticated";
import { getAudioById } from "./get-audio-by-id";

import { audioActionSchema } from "../dashboard/audios/schema";

export async function deleteAudio(input: z.infer<typeof audioActionSchema>) {
  audioActionSchema.parse(input);

  await ensureUserAuthenticated();
  await getAudioById({ id: input.id, userId: input.userId });

  await prisma.audio.update({
    where: {
      id: input.id,
    },
    data: {
      deletedAt: new Date(),
    },
  });

  revalidatePath("/dashboard/audios");

  return {
    data: "Audio deleted",
  };
}
