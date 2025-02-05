import emailjs from "@emailjs/browser";
import type { z } from "zod";

import type { sendEmailSchema } from "../dashboard/help/schema";

export async function sendEmail(formData: z.infer<typeof sendEmailSchema>) {
  const templateParams = {
    from_name: formData.name,
    title: formData.title,
    feedback: formData.feedbackType,
    message: formData.description,
  };

  await emailjs.send(
    process.env.EMAILJS_SERVICE_ID,
    process.env.EMAILJS_TEMPLATE_ID,
    templateParams,
    process.env.EMAILJS_PUBLIC_KEY,
  );

  return { data: "email send successfully" };
}
