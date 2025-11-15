"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useAnimation, AnimationOption } from "@/contexts/AnimationContext";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentAnimation, setCurrentAnimation } = useAnimation();
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const animationOptions = [
    { value: '1' as AnimationOption, label: 'Sequential Edge Draw' },
    // { value: '3' as AnimationOption, label: 'Geometric Wipe' },
    // { value: '4' as AnimationOption, label: '3D Flip Assembly' },
  ];

  const handleAnimationChange = (option: AnimationOption) => {
    setCurrentAnimation(option);
    setShowDropdown(false);
    // Force page reload to cleanly remount with new animation
    setTimeout(() => {
      window.location.reload();
    }, 50);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-lg py-4"
          : "bg-transparent py-6"
      }`}
    >
      <nav className="container mx-auto px-6 flex justify-between items-center">
        <a href="/" className="flex items-center gap-3">
          <Image
            src="/SVG_LOGO.svg"
            alt="Cortiscope Logo"
            width={40}
            height={40}
            className="w-10 h-10"
          />
          <div className="text-2xl font-bold text-primary">
            Cortiscope
          </div>
        </a>

        <div className="flex items-center gap-6">
          <a
            href="#demo-iframe"
            className={`font-semibold transition-colors ${
              isScrolled
                ? "text-primary hover:text-primary/80"
                : "text-dark hover:text-primary"
            }`}
          >
            Demo
          </a>

          <a
            href="#contact"
            className={`font-semibold transition-colors ${
              isScrolled
                ? "text-primary hover:text-primary/80"
                : "text-dark hover:text-primary"
            }`}
          >
            Contact Us
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
