"use client";

import React from "react";
import { motion } from "framer-motion";

interface StatCardProps {
  value: string;
  label: string;
  delay?: number;
}

export default function StatCard({ value, label, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="text-center p-6"
    >
      <motion.div
        initial={{ scale: 0.5 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay + 0.2, type: "spring" }}
        className="text-5xl md:text-6xl font-bold mb-2"
      >
        {/* Animation: counting */}
        {value}
      </motion.div>
      <div className="text-lg opacity-90">{label}</div>
    </motion.div>
  );
}
