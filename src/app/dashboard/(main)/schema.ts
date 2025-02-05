import { z } from "zod";

export const createAudioSchema = z.object({
  title: z
    .string({ required_error: "Please provide a title for your audio" })
    .nonempty("Please provide a title for your audio")
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(30, { message: "Title must not exceed 30 characters" }),
  text: z
    .string({
      required_error:
        "Please provide the text you want the AI to convert into audio",
    })
    .nonempty("Please provide the text you want the AI to convert into audio")
    .min(10, { message: "Text must be at least 10 characters long" })
    .refine((value) => value.replace(/\s/g, "").length <= 700, {
      message: "Text must not exceed 700 characters",
    }),
  "voice-id": z
    .string({ required_error: "Please select a voice for your audio" })
    .nonempty("Please select a voice for your audio"),
  languagesConfirmed: z.boolean().refine((value) => value === true, {
    message: "You must confirm that you have seen the supported languages",
  }),
});
