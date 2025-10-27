"use client";

import React from "react";
import { motion } from "framer-motion";
import { USE_CASES } from "@/lib/constants";
import Card from "@/components/ui/Card";

export default function UseCases() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center text-dark mb-16"
        >
          {USE_CASES.title}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {USE_CASES.cases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card title={useCase.title} description={useCase.description} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
