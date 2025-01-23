"use client";

import { TrashIcon } from "lucide-react";
import { z } from "zod";

import { deleteAudio } from "@/app/actions/delete-audio";
import { ErrorToast } from "@/components/error-toast";
import { Button } from "@/components/ui/button";

import { toast } from "@/hooks/use-toast";
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
        ErrorToast({ message: error.message });
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
