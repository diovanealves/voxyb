"use client";

import { motion } from "framer-motion";

import { Highlight } from "@/components/ui/hero-highlight";
import { topLanguages } from "@/data/languagues";

export function SupportedLanguages() {
  return (
    <section id="supported-languages" className="px-6 py-10">
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
            <Highlight>AI system is fluent in 32 different languages</Highlight>
            , enabling content creation for global markets. It facilitates the
            creation of engaging ads, ensuring your message resonates with
            audiences worldwide.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center">
          {topLanguages.map((language, index) => (
            <motion.div
              key={index}
              className="m-1 text-4xl md:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              {language.flag}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
