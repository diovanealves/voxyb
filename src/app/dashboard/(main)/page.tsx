import { AudioCard } from "../_components/audio-card";
import { TipsCard } from "../_components/tips-card";

export default function Page() {
  return (
    <div className="mt-10 flex h-full flex-col items-center justify-center md:mt-0">
      <AudioCard />
      <TipsCard />
    </div>
  );
}
