"use server";

import { z } from "zod";

import { stripe } from "@/lib/stripe";
import { createAudioSchema } from "../dashboard/(main)/schema";

export async function createCheckout(data: z.infer<typeof createAudioSchema>) {
  const paymentLink = await stripe.paymentLinks.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: "price_1QdaMbQGBKTXGYUfMTm4jEQy",
        quantity: 1,
      },
    ],
    after_completion: {
      type: "redirect",
      redirect: {
        url: `${process.env.HOST_URL}/dashboard/success?session_id={CHECKOUT_SESSION_ID}`,
      },
    },
    metadata: {
      title: data.title,
      text: data.text,
      "voice-id": data["voice-id"],
    },
  });

  return {
    id: paymentLink.id,
    url: paymentLink.url,
  };
}
