"use client";

import React from "react";
import { motion } from "framer-motion";
import { HERO } from "@/lib/constants";
import Button from "@/components/ui/Button";
import ParticleBackground from "@/components/ui/ParticleBackground";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-light-gray to-white overflow-hidden">
      {/* Particle Network Background */}
      <ParticleBackground />

      <div className="container mx-auto px-6 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-dark mb-6 leading-tight" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            {HERO.headline}
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 font-medium mb-12 max-w-3xl mx-auto" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
            {HERO.subheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button href="#contact">{HERO.cta.primary}</Button>
            <Button variant="secondary" href="#technology">
              {HERO.cta.secondary}
            </Button>
          </div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {HERO.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
