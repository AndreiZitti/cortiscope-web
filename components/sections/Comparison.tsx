"use client";

import React from "react";
import { motion } from "framer-motion";
import { COMPARISON } from "@/lib/constants";

export default function Comparison() {
  return (
    <section className="py-20 bg-light-gray">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center text-dark mb-16"
        >
          {COMPARISON.title}
        </motion.h2>

        <div className="max-w-5xl mx-auto overflow-x-auto">
          <table className="w-full bg-white rounded-xl overflow-hidden shadow-lg">
            <thead>
              <tr className="bg-dark text-white">
                <th className="p-6 text-left font-semibold">Feature</th>
                <th className="p-6 text-left font-semibold">Traditional Systems</th>
                <th className="p-6 text-left font-semibold bg-primary">
                  NosoScan
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.rows.map((row, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="border-b border-gray-200 hover:bg-light-gray transition-colors"
                >
                  {/* Animation: highlight on scroll */}
                  <td className="p-6 font-semibold text-dark">{row.feature}</td>
                  <td className="p-6 text-gray-600">{row.traditional}</td>
                  <td className="p-6 text-dark font-medium bg-primary/5">
                    {row.nososcan}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
