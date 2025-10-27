"use client";

import React from "react";
import { motion } from "framer-motion";
import { WHY_IT_WORKS } from "@/lib/constants";

export default function BiologicallyAware() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center text-dark mb-4"
        >
          {WHY_IT_WORKS.headline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto"
        >
          {WHY_IT_WORKS.subheadline}
        </motion.p>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left side: Three pillars */}
          <div className="space-y-8">
            {WHY_IT_WORKS.parts.map((part, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">
                      {index + 1}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-dark mb-2">
                    {part.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {part.description}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Result statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="pt-6 border-t-2 border-primary/20"
            >
              <p className="text-xl font-semibold text-dark">
                {WHY_IT_WORKS.result}
              </p>
            </motion.div>
          </div>

          {/* Right side: Video */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl bg-dark/5">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
              >
                <source src="/CA_sample1.mp4" type="video/mp4" />
              </video>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark/80 to-transparent p-6">
                <p className="text-white font-medium text-center">
                  {WHY_IT_WORKS.videoCaption}
                </p>
              </div>
            </div>

            {/* Color Legend */}
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-yellow-400 border border-yellow-600"></div>
                  <span className="text-gray-700 font-medium">Tumor</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-blue-500 border border-blue-700"></div>
                  <span className="text-gray-700 font-medium">Healthy Tissue</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
