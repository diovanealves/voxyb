"use server";

import { DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { auth } from "@/services/auth";
import { prisma } from "@/services/database";

import { cloudflareR2 } from "@/lib/cloudflare";
import { audioActionSchema } from "./schema";

export async function getUserAudio() {
  const session = await auth();

  const audios = await prisma.audio.findMany({
    where: {
      userId: session?.user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return audios;
}

export async function getAudioDownloadUrl(
  input: z.infer<typeof audioActionSchema>,
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("You are not signed in. Please log in and try again.");
  }

  const audio = await prisma.audio.findUnique({
    where: { id: input.id },
  });

  if (!audio) {
    throw new Error("Audio not found");
  }

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
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "You are not signed in. Please log in and try again.",
      action: true,
      data: null,
    };
  }

  const audio = await prisma.audio.findUnique({
    where: {
      id: input.id,
      userId: session.user.id,
    },
    select: {
      id: true,
      url: true,
    },
  });

  if (!audio) {
    return {
      error: "The audio you are looking for doesn't exist.",
      data: null,
    };
  }

  const commandDelete = new DeleteObjectCommand({
    Bucket: process.env.CLOUDFLARE_BUCKET,
    Key: audio.url,
  });
  await cloudflareR2.send(commandDelete);

  await prisma.audio.delete({
    where: {
      id: input.id,
      userId: session.user.id,
    },
  });

  revalidatePath("/dashboard/audios");

  return {
    error: null,
    data: "Audio deleted",
  };
}
