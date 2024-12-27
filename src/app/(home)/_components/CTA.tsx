"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export function CTA() {
  return (
    <section className="w-full bg-gradient-to-br from-blue-900 to-purple-900 px-6 py-10 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-white md:text-4xl"
      >
        Ready to Transform Your Text into Lifelike Audio?
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-4 mt-2 text-base text-white md:text-lg"
      >
        Join thousands of satisfied users and experience the future of
        text-to-speech technology today!
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Button variant="outline" className="px-8 py-5">
          <Link
            href="/login"
            className="flex items-center rounded-lg text-lg font-semibold transition-all hover:scale-105"
          >
            Get Started Now
            <ArrowRightIcon className="group-hover:translate-x-1: ml-2 h-5 w-5 transition-transform" />
          </Link>
        </Button>
      </motion.div>
    </section>
  );
}
