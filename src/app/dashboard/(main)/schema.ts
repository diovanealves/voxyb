import { z } from "zod";

export const createAudioSchema = z.object({
  title: z
    .string({ required_error: "Please provide a title for your audio" })
    .nonempty("Please provide a title for your audio")
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title must not exceed 100 characters" }),
  text: z
    .string({
      required_error:
        "Please provide the text you want the AI to convert into audio",
    })
    .nonempty("Please provide the text you want the AI to convert into audio")
    .min(10, { message: "Text must be at least 10 characters long" })
    .max(500, { message: "Text must not exceed 500 characters" }),
  "voice-id": z
    .string({ required_error: "Please select a voice for your audio" })
    .nonempty("Please select a voice for your audio"),
});
