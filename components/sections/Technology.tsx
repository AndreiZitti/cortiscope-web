"use client";

import React from "react";
import { motion } from "framer-motion";
import { BUILT_FOR_TRUST } from "@/lib/constants";

export default function Technology() {
  return (
    <section id="technology" className="py-20 bg-light-gray">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center text-dark mb-4"
        >
          {BUILT_FOR_TRUST.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto"
        >
          {BUILT_FOR_TRUST.subheadline}
        </motion.p>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {BUILT_FOR_TRUST.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-3 h-3 rounded-full bg-primary mt-2" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-dark mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Key differentiator callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <div className="inline-block bg-primary/10 px-8 py-6 rounded-xl border-2 border-primary/20">
              <p className="text-xl font-semibold text-dark">
                <span className="text-primary">Key difference:</span> They optimize for performance alone.
                <br className="hidden md:block" />
                We optimize for trust.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
