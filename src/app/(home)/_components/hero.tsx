"use client";

import { Button } from "@/components/ui/button";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section
      id="about"
      className="flex h-full flex-col justify-center text-center"
    >
      <TextGenerateEffect
        words="Transform Text into Natural Audio"
        className="tracking-tighte text-4xl font-black md:text-5xl"
        duration={0.6}
      />

      <motion.p
        className="mt-2 text-base font-semibold text-muted-foreground md:text-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      >
        Convert your text into realistic speech in seconds with our advanced AI
        technology.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
      >
        <Button asChild className="mt-6 font-medium" size="lg">
          <Link href={"#"}>
            Try It Now <ArrowRightIcon className="h-6 w-6" />
          </Link>
        </Button>
      </motion.div>
    </section>
  );
}
