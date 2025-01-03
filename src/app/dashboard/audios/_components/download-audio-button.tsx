import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { DownloadIcon } from "lucide-react";
import { z } from "zod";
import { getAudioDownloadUrl } from "../actions";
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
        toast({
          variant: "destructive",
          description: error.message,
        });
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
