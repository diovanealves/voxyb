import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { AudioForm } from "./audio-form";

export function AudioCard() {
  return (
    <Card className="w-11/12">
      <CardTitle className="my-2 mt-5 text-center text-xl font-bold">
        Create Your Audio
      </CardTitle>
      <CardContent>
        <AudioForm />
      </CardContent>
    </Card>
  );
}
