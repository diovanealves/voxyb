"use server";

import { z } from "zod";

import { stripe } from "@/lib/stripe";
import { createAudioSchema } from "../dashboard/(main)/schema";

export async function createCheckout(data: z.infer<typeof createAudioSchema>) {
  const checkout = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    locale: "en",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "VoicelyB Studio",
            description:
              "Experience cutting-edge AI-generated audio, designed to deliver seamless, high-quality sound for any purpose.",
          },
          unit_amount: 1899,
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.HOST_URL}/dashboard/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.HOST_URL}/dashboard`,
    metadata: {
      title: data.title,
      text: data.text,
      "voice-id": data["voice-id"],
    },
  });

  return {
    id: checkout.id,
  };
}
