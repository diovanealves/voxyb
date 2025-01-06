"use client";

import { deleteAudio } from "@/app/actions/delete-audio";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import { TrashIcon } from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import { audioActionSchema } from "../schema";

export function DeleteAudioButton({
  id,
  userId,
}: z.infer<typeof audioActionSchema>) {
  async function handleDelete() {
    try {
      await deleteAudio({ id, userId });
      toast({
        variant: "success",
        description: "The audio was successfully deleted",
      });
    } catch (error) {
      if (error instanceof Error) {
        if (
          error.message ===
          "You are not signed in. Please log in and try again."
        ) {
          toast({
            variant: "destructive",
            description: error.message,
            action: (
              <ToastAction altText="Click here" asChild>
                <Link href="/login">Click here</Link>
              </ToastAction>
            ),
          });
        } else {
          toast({
            variant: "destructive",
            description: error.message,
          });
        }
      }
    }
  }

  return (
    <Button
      size="icon"
      variant="ghost"
      className="text-muted-foreground"
      onClick={handleDelete}
    >
      <TrashIcon className="h-3 w-3" />
    </Button>
  );
}
