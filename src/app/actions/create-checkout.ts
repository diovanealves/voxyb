"use server";

import { z } from "zod";

import { stripe } from "@/lib/stripe";
import { createAudioSchema } from "../dashboard/(main)/schema";
import { ensureUserAuthenticated } from "./ensure-user-authenticated";

export async function createCheckout(data: z.infer<typeof createAudioSchema>) {
  const { session } = await ensureUserAuthenticated();

  if (!session.id) {
    throw new Error("User not found");
  }

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
      userId: session.id,
    },
  });

  return {
    id: paymentLink.id,
    url: paymentLink.url,
  };
}
