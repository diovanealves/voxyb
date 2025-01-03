"use server";

import { DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/services/database";
import { ensureUserAuthenticated } from "../(main)/actions";

import { cloudflareR2 } from "@/lib/cloudflare";
import { audioActionSchema } from "./schema";

export async function getUserAudio() {
  const session = await ensureUserAuthenticated();

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

export async function getAudioById(input: z.infer<typeof audioActionSchema>) {
  const audio = await prisma.audio.findUnique({
    where: { id: input.id },
    select: {
      id: true,
      title: true,
      url: true,
    },
  });

  if (!audio) {
    throw new Error("The audio you are looking for doesn't exist.");
  }

  return audio;
}

export async function getAudioDownloadUrl(
  input: z.infer<typeof audioActionSchema>,
) {
  await ensureUserAuthenticated();

  const audio = await getAudioById({ id: input.id });

  const getAudioCommand = new GetObjectCommand({
    Bucket: process.env.CLOUDFLARE_BUCKET,
    Key: audio.url,
  });

  const signedUrl = await getSignedUrl(cloudflareR2, getAudioCommand, {
    expiresIn: 3600,
  });

  if (!signedUrl) {
    throw new Error("Failed to generate download link");
  }

  return { title: audio.title, url: signedUrl };
}

export async function deleteAudio(input: z.infer<typeof audioActionSchema>) {
  const session = await ensureUserAuthenticated();

  const audio = await getAudioById({ id: input.id });

  const commandDelete = new DeleteObjectCommand({
    Bucket: process.env.CLOUDFLARE_BUCKET,
    Key: audio.url,
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
