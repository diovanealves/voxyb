import { z } from "zod";

export const sendEmailSchema = z.object({
  name: z
    .string({
      required_error:
        "Please provide your name. This will help us address you correctly.",
    })
    .nonempty(
      "Please provide your name. This will help us address you correctly.",
    ),
  email: z
    .string({
      required_error: "An email address is required so we can contact you.",
    })
    .email(
      "The email address you entered is not valid. Please enter a correct email address.",
    )
    .nonempty("An email address is required so we can contact you."),
  title: z
    .string({
      required_error:
        "Please provide a title for your message. This helps us understand the subject.",
    })
    .nonempty(
      "Please provide a title for your message. This helps us understand the subject.",
    ),
  description: z
    .string({
      required_error:
        "A description is required. Please share your feedback or issue with us.",
    })
    .min(
      10,
      "Your description is too short. Please provide at least 10 characters to explain your issue or suggestion.",
    )
    .nonempty(
      "A description is required. Please share your feedback or issue with us.",
    ),
  feedbackType: z.enum(["feature", "bug", "other"], {
    errorMap: () => ({
      message:
        "Please select the type of feedback: 'Feature', 'Bug', or 'Other'.",
    }),
  }),
});
