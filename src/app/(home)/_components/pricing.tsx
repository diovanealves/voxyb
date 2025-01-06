"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckIcon } from "lucide-react";
import Link from "next/link";

const features = [
  "High-quality audio output",
  "Multiple voice options",
  "Priority customer support",
  "No subscription required",
  "Pay only for what you use",
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="w-full bg-gradient-to-br from-blue-900 to-purple-900 px-6 py-10"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-7 text-center text-3xl font-bold text-white"
      >
        Simple, Transparent Pricing
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mx-auto max-w-md bg-white text-black">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              Pay Per Generation
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4 text-4xl font-bold">$18.99</p>
            <p className="text-muted-foreground">per audio generation</p>

            <ul className="mt-6 space-y-3 text-left">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center"
                >
                  <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>

            <Button
              asChild
              className="mt-3 w-full rounded-lg dark:text-white"
              variant="outline"
            >
              <Link href="/login">Get Started Now</Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
