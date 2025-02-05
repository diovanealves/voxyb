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

  const emailResponse = await emailjs.send(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    templateParams,
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
  );

  if (emailResponse.status !== 200) {
    throw new Error("Unable to send email. Please try again later.");
  }

  return { data: "email send successfully" };
}
