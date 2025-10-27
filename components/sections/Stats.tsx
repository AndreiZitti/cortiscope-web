"use client";

import React from "react";
import { motion } from "framer-motion";
import { STATS_SECTION } from "@/lib/constants";
import StatCard from "@/components/ui/StatCard";

export default function Stats() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary to-blue-600 text-white">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          {STATS_SECTION.title}
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {STATS_SECTION.stats.map((stat, index) => (
            <div key={index} className="text-white">
              <StatCard
                value={stat.value}
                label={stat.label}
                delay={index * 0.1}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
