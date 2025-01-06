"use client";

import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

export function LoginForm() {
  return (
    <div className="mt-8 space-y-4">
      <Button
        variant="outline"
        className="w-full"
        onClick={() => signIn("google", { redirectTo: "/dashboard" })}
      >
        <Icons.google className="mr-w h-4 w-4" />
        Continue with Google
      </Button>
    </div>
  );
}
