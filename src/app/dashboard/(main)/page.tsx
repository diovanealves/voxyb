import { AudioForm } from "../_components/audio-form";

export default function Page() {
  return (
    <div className="flex h-full flex-col items-center justify-center py-12">
      <div className="w-11/12">
        <h1 className="text-2xl font-bold tracking-tight">Create Your Audio</h1>
        <p className="mb-4 text-sm text-muted-foreground">
          Convert your text into natural-sounding speech with AI voices
        </p>

        <AudioForm />
      </div>
    </div>
  );
}
