"use client";

import { TrashIcon } from "lucide-react";
import { z } from "zod";

import { deleteAudio } from "@/app/actions/delete-audio";
import { ErrorToast } from "@/components/error-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" className="text-muted-foreground">
          <TrashIcon className="h-3 w-3" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader className="space-y-3">
          <DialogTitle>Are you sure you want to delete this audio?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. The audio file will be permanently
            removed from your library.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
