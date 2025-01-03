import { ElevenLabsClient } from "elevenlabs";

export const elevenLabsClient = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});
