"use server";

import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { cloudflareR2 } from "@/lib/cloudflare";
import { prisma } from "@/services/database";
import { ensureUserAuthenticated } from "./ensure-user-authenticated";
import { getAudioById } from "./get-audio-by-id";

import { audioActionSchema } from "../dashboard/audios/schema";

export async function deleteAudio(input: z.infer<typeof audioActionSchema>) {
  audioActionSchema.parse(input);
  const { session } = await ensureUserAuthenticated();

  const audio = await getAudioById({ id: input.id });

  const commandDelete = new DeleteObjectCommand({
    Bucket: process.env.CLOUDFLARE_BUCKET,
    Key: audio.key,
  });

  await cloudflareR2.send(commandDelete);

  await prisma.audio.delete({
    where: {
      id: input.id,
      userId: session.id,
    },
  });

  revalidatePath("/dashboard/audios");

  return {
    data: "Audio deleted",
  };
}
