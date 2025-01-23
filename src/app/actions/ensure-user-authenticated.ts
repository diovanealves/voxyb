"use server";

import { auth } from "@/services/auth";

export async function ensureUserAuthenticated() {
  const session = await auth();

  if (!session?.user) {
    throw new Error("You are not signed in. Please log in and try again.", {
      cause: "unauthenticated",
    });
  }

  return { session: session.user };
}
