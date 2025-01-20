"use server";

import { cloudflareR2 } from "@/lib/cloudflare";
import { elevenLabsClient } from "@/lib/elevenlabs";
import { prisma } from "@/services/database";
import { PutObjectCommand } from "@aws-sdk/client-s3";

interface CreateAudioWithPayment {
  title: string;
  text: string;
  "voice-id": string;
  paymentSessionId: string;
  userId: string;
}

export async function createAudio(data: CreateAudioWithPayment) {
  const duplicateAudio = await prisma.audio.findUnique({
    where: {
      paymentSessionId: data.paymentSessionId,
    },
    select: {
      id: true,
    },
  });

  if (duplicateAudio) {
    throw new Error("Audio already created");
  }

  const audioStream = await elevenLabsClient.generate({
    voice: data["voice-id"],
    output_format: "mp3_44100_128",
    text: data.text,
    model_id: "eleven_flash_v2_5",
  });

  const chunks: Buffer[] = [];
  for await (const chunk of audioStream) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  const buffer = Buffer.concat(chunks);
  const filename = `${data.paymentSessionId}-${crypto.randomUUID()}.mp3`;

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.CLOUDFLARE_BUCKET,
    Key: filename,
    Body: buffer,
    ContentType: "audio/mpeg",
  });
  await cloudflareR2.send(putObjectCommand);

  await prisma.audio.create({
    data: {
      title: data.title,
      key: filename,
      userId: data.userId,
      paymentSessionId: data.paymentSessionId,
    },
  });

  return { success: true };
}
