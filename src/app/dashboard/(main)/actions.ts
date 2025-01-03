"use server";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { z } from "zod";

import { auth } from "@/services/auth";
import { prisma } from "@/services/database";

import { cloudflareR2 } from "@/lib/cloudflare";
import { elevenLabsClient } from "@/lib/elevenlabs";

import { createAudioSchema } from "./schema";

export async function createAudio(data: z.infer<typeof createAudioSchema>) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("User not authorized");
  }

  const audioStream = await elevenLabsClient.generate({
    voice: data["voice-id"],
    output_format: "mp3_44100_128",
    text: data.text,
    model_id: "eleven_flash_v2",
  });

  const chunks: Buffer[] = [];

  for await (const chunk of audioStream) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  const buffer = Buffer.concat(chunks);

  const fileName = `${session?.user?.id}-${crypto.randomUUID()}`;

  const putObjectCommand = new PutObjectCommand({
    Bucket: "voicelyb-audio",
    Key: fileName,
    Body: buffer,
    ContentType: "audio/mpeg",
  });

  await cloudflareR2.send(putObjectCommand);

  await prisma.audio.create({
    data: {
      title: data.title,
      url: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com/voicelyb-audio/${fileName}`,
      userId: session.user.id,
    },
  });

  return { data: "Audio generated successfully" };
}
