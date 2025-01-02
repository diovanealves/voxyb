import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TipsCard() {
  return (
    <Card className="mt-10 w-11/12">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Usage tips</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold">Title</h3>
          <p>
            The title helps you identify your audio generation in the table,
            making it easier to find and manage your creations.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Text to Convert</h3>
          <p>
            Enter the text you want to transform into audio. This content will
            be processed and made available for download as an audio file.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Voice Selection</h3>
          <p>
            Choose both a male and a female voice for your audio. You can
            preview how your text would sound with each voice before generating
            the final audio.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
