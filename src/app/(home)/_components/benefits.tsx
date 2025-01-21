"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { benefitsData } from "@/data/benefitsData";

export function Benefits() {
  const { ref, inView } = useInView({
    threshold: 0.25,
    triggerOnce: true,
  });

  return (
    <section id="benefits" className="px-6 py-10" ref={ref}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView && { opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 text-center text-3xl font-bold"
      >
        Why Our Text-to-Speech Solution Is Perfect for Everyone
      </motion.h2>

      <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        {benefitsData.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={inView && { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
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
