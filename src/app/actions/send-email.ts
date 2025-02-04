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
    "service_shlljsp",
    "template_dne037e",
    templateParams,
    "eCQAmLCHM0UKWC0ju",
  );

  return { data: "email send successfully" };
}
