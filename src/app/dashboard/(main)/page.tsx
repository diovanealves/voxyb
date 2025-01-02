import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CreateAudioForm } from "../_components/create-audio-form";

export default function Page() {
  return (
    <div className="flex h-full items-center justify-center">
      <Card className="w-11/12 pt-6">
        <CardTitle className="mb-2 text-center text-xl font-bold">
          Create Your Audio
        </CardTitle>
        <CardContent>
          <CreateAudioForm />

          
        </CardContent>
      </Card>
    </div>
  );
}
