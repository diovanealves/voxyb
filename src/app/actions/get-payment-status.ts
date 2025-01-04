"use server";

import { stripe } from "@/lib/stripe";

export async function getPaymentStatus(sessionId: string) {
  const sessionStatus = await stripe.checkout.sessions.retrieve(sessionId);

  if (sessionStatus.payment_status === "paid") {
    return {
      status: "paid",
      data: sessionStatus.metadata,
    };
  }

  return {
    status: "unpaid",
    data: null,
  };
}
