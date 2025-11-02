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
    { value: '3' as AnimationOption, label: 'Geometric Wipe' },
    { value: '4' as AnimationOption, label: '3D Flip Assembly' },
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
            src="/CortiscopeLogo.png"
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
          {/* Animation Toggle Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className={`flex items-center gap-2 font-semibold transition-colors px-4 py-2 rounded-lg ${
                isScrolled
                  ? "text-primary hover:bg-primary/10"
                  : "text-dark hover:bg-white/20"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
              </svg>
              <span className="hidden md:inline">Animation</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showDropdown && (
              <div className="absolute top-full right-0 mt-2 bg-white shadow-xl rounded-lg overflow-hidden min-w-[220px] border border-gray-200">
                {animationOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnimationChange(option.value)}
                    className={`w-full text-left px-4 py-3 transition-colors ${
                      currentAnimation === option.value
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-100 text-dark'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm">{option.value}</span>
                      <span className="text-sm">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

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
