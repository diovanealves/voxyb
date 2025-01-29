import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AudioForm } from "./audio-form";

export function AudioCard() {
  return (
    <Card className="w-11/12">
      <CardHeader>
        <CardTitle className="text-2xl">Create Your Audio</CardTitle>
        <CardDescription>
          Convert your text into natural-sounding speech with AI voices
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AudioForm />
      </CardContent>
    </Card>
  );
}
