import { z } from "zod";

export const audioActionSchema = z.object({
  id: z
    .string({
      required_error: "ID is required. Please provide a valid ID.",
    })
    .nonempty("ID cannot be empty. Please make sure a valid ID is provided.")
    .uuid("The provided ID is invalid. Please provide a valid UUID format."),

  userId: z
    .string({
      required_error: "User ID is required. Please provide a valid User ID.",
    })
    .nonempty(
      "User ID cannot be empty. Please make sure a valid User ID is provided.",
    )
    .cuid(
      "The provided User ID is invalid. Please provide a valid UUID format.",
    ),
});
