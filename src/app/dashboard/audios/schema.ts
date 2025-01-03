import { z } from "zod";

export const audioActionSchema = z.object({
  id: z.string({ required_error: "ID is required" }),
});
