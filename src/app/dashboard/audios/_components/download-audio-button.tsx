import { getAudioDownloadUrl } from "@/app/actions/get-audio-download-url";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import { DownloadIcon } from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import { audioActionSchema } from "../schema";

export function DownloadAudioButton({ id }: z.infer<typeof audioActionSchema>) {
  async function handleDownload() {
    try {
      const getSignedAudioUrl = await getAudioDownloadUrl({ id });
      const fetchAudio = await fetch(getSignedAudioUrl.url);

      if (!fetchAudio) {
        toast({
          variant: "destructive",
          description: "Failed to download audio",
        });
      }

      const blob = await fetchAudio.blob();
      const bloblUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = bloblUrl;
      link.download = getSignedAudioUrl.title;
      link.click();
      URL.revokeObjectURL(bloblUrl);
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
      onClick={handleDownload}
    >
      <DownloadIcon className="h-3 w-3" />
    </Button>
  );
}
