"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Flag from "react-world-flags";

import { Highlight } from "@/components/ui/hero-highlight";
import { languagesData } from "@/data/languaguesData";

export function SupportedLanguages() {
  const { ref, inView } = useInView({
    threshold: 0.25,
    triggerOnce: true,
  });

  return (
    <section id="supported-languages" className="px-6 py-10" ref={ref}>
      <h2 className="mb-12 text-center text-3xl font-bold">
        Supported Languages
      </h2>

      <div className="grid md:grid-cols-2">
        <div className="space-y-3">
          <h3 className="text-2xl font-semibold">
            AI-Powered Multilingual Capabilities
          </h3>
          <p className="text-lg font-medium">
            Our advanced{" "}
            <Highlight inView={inView}>
              AI system is fluent in 32 different languages
            </Highlight>
            , enabling content creation for global markets. It facilitates the
            creation of engaging ads, ensuring your message resonates with
            audiences worldwide.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {languagesData.slice(0, 12).map((language, index) => (
            <motion.div
              key={index}
              className="m-1 text-4xl md:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={inView && { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div>
                <Flag
                  code={language.code}
                  className="aspect-square h-14 w-24 object-cover"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
