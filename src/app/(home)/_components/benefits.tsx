"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  BriefcaseIcon,
  GlobeIcon,
  LockIcon,
  MicIcon,
  SmartphoneIcon,
  ZapIcon,
} from "lucide-react";

const benefits = [
  {
    icon: <MicIcon className="h-12 w-12" />,
    title: "Natural Human Voices",
    description:
      "Our AI generates incredibly lifelike speech that's indistinguishable from human voices.",
  },
  {
    icon: <ZapIcon className="h-12 w-12" />,
    title: "Lightning Fast",
    description:
      "Convert text to speech in seconds with our powerful and efficient processing engine.",
  },
  {
    icon: <SmartphoneIcon className="h-12 w-12" />,
    title: "Cross-Platform",
    description:
      "Use our service on any device - smartphone, tablet, or computer, anytime and anywhere.",
  },
  {
    icon: <GlobeIcon className="h-12 w-12" />,
    title: "Multiple Languages",
    description:
      "Support for over 32 languages and accents, making your content globally accessible.",
  },
  {
    icon: <LockIcon className="h-12 w-12" />,
    title: "Secure & Private",
    description:
      "Your data is encrypted and protected. We prioritize your privacy and security.",
  },
  {
    icon: <BriefcaseIcon className="h-12 w-12" />,
    title: "Business Voiceovers",
    description:
      "Enhance your presentations and ads with professional AI voiceovers customized to your brand.",
  },
];

export function Benefits() {
  return (
    <section id="benefits" className="px-6 py-10">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 text-center text-3xl font-bold"
      >
        Why Our Text-to-Speech Solution Is Perfect for Everyone
      </motion.h2>

      <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
            <Card className="h-72 rounded-xl shadow-lg transition-all hover:shadow-xl">
              <CardHeader>
                <CardTitle className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-900 to-purple-900 text-white">
                  {benefit.icon}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="mb-2 text-xl font-semibold">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
