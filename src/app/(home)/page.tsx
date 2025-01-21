import { Benefits } from "./_components/benefits";
import { CTA } from "./_components/CTA";
import { Faq } from "./_components/faq";
import { Hero } from "./_components/hero";
import { Navbar } from "./_components/navbar";
import { Pricing } from "./_components/pricing";
import { Stats } from "./_components/stats";
import { SupportedLanguages } from "./_components/supported-languages";

export default function Home() {
  return (
    <div>
      <div className="container mx-auto">
        <div className="h-screen overflow-hidden">
          <Navbar />
          <Hero />
        </div>
        <Benefits />
        <SupportedLanguages />
        <Stats />
      </div>
      <Pricing />
      <Faq />
      <CTA />
    </div>
  );
}
