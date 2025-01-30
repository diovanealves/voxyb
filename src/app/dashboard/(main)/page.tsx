import { AudioCard } from "../_components/audio-card";
import { TipsCard } from "../_components/tips-card";

export default function Page() {
  return (
    <div className="flex h-full flex-col items-center justify-center py-12">
      <AudioCard />
      <TipsCard />
    </div>
  );
}
