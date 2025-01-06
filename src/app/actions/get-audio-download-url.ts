"use server";

import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { z } from "zod";

import { cloudflareR2 } from "@/lib/cloudflare";
import { ensureUserAuthenticated } from "./ensure-user-authenticated";
import { getAudioById } from "./get-audio-by-id";

import { audioActionSchema } from "../dashboard/audios/schema";

export async function getAudioDownloadUrl(
  input: z.infer<typeof audioActionSchema>,
) {
  await ensureUserAuthenticated();

  const audio = await getAudioById({ id: input.id });

  const getAudioCommand = new GetObjectCommand({
    Bucket: process.env.CLOUDFLARE_BUCKET,
    Key: audio.key,
  });

  const signedUrl = await getSignedUrl(cloudflareR2, getAudioCommand, {
    expiresIn: 3600,
  });

  if (!signedUrl) {
    throw new Error("Failed to generate download link");
  }

  return { title: audio.title, url: signedUrl };
}
