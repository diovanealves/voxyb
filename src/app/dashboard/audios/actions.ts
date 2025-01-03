"use server";

import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { auth } from "@/services/auth";
import { prisma } from "@/services/database";

import { cloudflareR2 } from "@/lib/cloudflare";
import { deleteAudioSchema } from "./schema";

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

export async function deleteAudio(input: z.infer<typeof deleteAudioSchema>) {
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

  const fileName = audio.url.split("/").slice(-1)[0];
  const commandDelete = new DeleteObjectCommand({
    Bucket: process.env.CLOUDFLARE_BUCKET,
    Key: fileName,
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
