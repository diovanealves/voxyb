"use server";

import { z } from "zod";

import { stripe } from "@/lib/stripe";

import { createAudioSchema } from "../dashboard/(main)/schema";

export async function createCheckout(data: z.infer<typeof createAudioSchema>) {
  const successUrl = `${process.env.HOST_URL}/dashboard/success?title=${data.title}&text=${data.text}&voice-id=${data["voice-id"]}`;
  const cancelUrl = `${process.env.HOST_URL}/dashboard`;

  const checkout = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: successUrl,
    cancel_url: cancelUrl,
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
  });

  return {
    id: checkout.id,
    url: checkout.url,
  };
}
