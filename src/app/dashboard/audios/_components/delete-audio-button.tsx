"use client";

import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import { TrashIcon } from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import { deleteAudio } from "../actions";
import { deleteAudioSchema } from "../schema";

export function DeleteAudioButton({ id }: z.infer<typeof deleteAudioSchema>) {
  async function handleDelete() {
    const audioDeleted = await deleteAudio({ id });

    if (audioDeleted?.error) {
      toast({
        description: audioDeleted?.error,
        action: audioDeleted?.action ? (
          <ToastAction altText="Click here" asChild>
            <Link href="/login">Click here</Link>
          </ToastAction>
        ) : undefined,
        variant: "destructive",
      });
    } else {
      toast({
        description: "The audio was successfully deleted",
        variant: "success",
      });
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
