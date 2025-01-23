import { DownloadIcon } from "lucide-react";
import { z } from "zod";

import { ErrorToast } from "@/components/error-toast";
import { Button } from "@/components/ui/button";

import { getAudioDownloadUrl } from "@/app/actions/get-audio-download-url";
import { audioActionSchema } from "../schema";

export function DownloadAudioButton({
  id,
  userId,
}: z.infer<typeof audioActionSchema>) {
  async function handleDownload() {
    try {
      const getSignedAudioUrl = await getAudioDownloadUrl({ id, userId });
      const fetchAudio = await fetch(getSignedAudioUrl.url);

      if (!fetchAudio) {
        ErrorToast({ message: "Failed to download audio" });
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
        ErrorToast({ message: error.message });
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
