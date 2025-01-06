"use server";

import { z } from "zod";

import { prisma } from "@/services/database";
import { audioActionSchema } from "../dashboard/audios/schema";

export async function getAudioById(input: z.infer<typeof audioActionSchema>) {
  audioActionSchema.parse(input);

  const audio = await prisma.audio.findUnique({
    where: { id: input.id },
    select: {
      id: true,
      title: true,
      key: true,
    },
  });

  if (!audio) {
    throw new Error("The audio you are looking for doesn't exist.");
  }

  return audio;
}
