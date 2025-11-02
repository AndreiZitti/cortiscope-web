"use client";

import React, { useState } from "react";
import AnimatedLogo from "@/components/ui/AnimatedLogo";
import Button from "@/components/ui/Button";
import ParticleBackgroundCTA from "@/components/ui/ParticleBackgroundCTA";

export default function CTA() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    role: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="relative bg-gradient-to-br from-light-gray to-white overflow-hidden min-h-screen">{/* White background matching Hero */}

      {/* Particle Network Background */}
      <ParticleBackgroundCTA />

      <div className="py-20 relative z-10">
        <div className="container mx-auto px-6">

          {/* Centered layout */}
          <div className="max-w-5xl mx-auto text-center space-y-12">

            {/* Logo Animation */}
            <div className="flex justify-center">
              <AnimatedLogo />
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Ready to See NosoScan in Action?
              </h2>
              <p className="text-xl text-gray-600">
                Join hospitals and research institutions evaluating transparent, auditable AI for medical imaging
              </p>
            </div>

            {/* Compact Form */}
            <div className="max-w-2xl mx-auto bg-gray-50 p-8 rounded-2xl border border-gray-200">
              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Name + Email row */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                      placeholder="Dr. Jane Smith"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      Email<span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                      placeholder="jane@hospital.edu"
                    />
                  </div>
                </div>

                {/* Organization + Role row */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="organization"
                      className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      Organization<span className="text-red-500">*</span>
                    </label>
                    <input
                      id="organization"
                      name="organization"
                      type="text"
                      required
                      value={formData.organization}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                      placeholder="General Hospital"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="role"
                      className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      Role<span className="text-red-500">*</span>
                    </label>
                    <input
                      id="role"
                      name="role"
                      type="text"
                      required
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                      placeholder="Radiologist, CTO, etc."
                    />
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-4">
                  <Button className="w-full md:w-auto px-12 py-3">
                    Request Demo
                  </Button>
                </div>
              </form>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm text-gray-500 font-medium">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                95.2% accuracy
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                Hospital-ready
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                Full transparency
              </span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
