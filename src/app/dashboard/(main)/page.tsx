"use client";

import { TourProvider, components } from "@reactour/tour";

import { stepsCreateAudioData } from "@/data/stepsCreateAudioData";
import { AudioForm } from "../_components/audio-form";

export default function Page() {
  return (
    <TourProvider
      steps={stepsCreateAudioData}
      beforeClose={() => localStorage.setItem("hasSeenTutorial", "true")}
      components={{
        Badge: () => null,
        Content: (props) => (
          <div className="pt-2 text-black">
            <components.Content {...props} />
          </div>
        ),
        Close: ({ onClick }) => (
          <components.Close
            onClick={onClick}
            styles={{
              close: (base) => ({
                ...base,
                color: "#000",
                width: 10,
                marginLeft: 4,
              }),
            }}
          />
        ),
      }}
    >
      <div className="flex h-full flex-col items-center justify-center py-12">
        <div className="w-11/12">
          <h1 className="text-2xl font-bold tracking-tight">
            Create Your Audio
          </h1>
          <p className="mb-4 text-sm text-muted-foreground">
            Convert your text into natural-sounding speech with AI voices
          </p>

          <AudioForm />
        </div>
      </div>
    </TourProvider>
  );
}
