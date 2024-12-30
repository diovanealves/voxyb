import { z } from "zod";

export const deleteAudioSchema = z.object({
  id: z.string({ required_error: "ID is required" }),
});
