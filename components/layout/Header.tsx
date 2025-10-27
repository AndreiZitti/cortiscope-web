"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      </nav>
    </motion.header>
  );
}
