"use client";

import React from "react";
import { motion } from "framer-motion";
import { BIOLOGICALLY_AWARE } from "@/lib/constants";

export default function BiologicallyAware() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center text-dark mb-16 max-w-4xl mx-auto"
        >
          {BIOLOGICALLY_AWARE.headline}
        </motion.h2>

        <div className="max-w-5xl mx-auto">
          {/* Animation: three elements converge */}
          <div className="grid md:grid-cols-3 gap-8">
            {BIOLOGICALLY_AWARE.parts.map((part, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="text-6xl font-bold text-primary mb-4">
                  {index + 1}
                </div>
                <h3 className="text-2xl font-bold text-dark mb-4">
                  {part.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {part.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
