"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CTA_SECTION } from "@/lib/constants";
import Button from "@/components/ui/Button";

export default function CTA() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    role: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 bg-light-gray">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center text-dark mb-16"
        >
          {CTA_SECTION.headline}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-16">
          {CTA_SECTION.paths.map((path, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="p-8 bg-white rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-bold text-dark mb-4">
                {path.title}
              </h3>
              <p className="text-gray-600 mb-6">{path.description}</p>
              <Button>{path.cta}</Button>
            </motion.div>
          ))}
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg"
        >
          <h3 className="text-2xl font-bold text-dark mb-6 text-center">
            Get in Touch
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            {CTA_SECTION.form.fields.map((field, index) => (
              <div key={index}>
                <label
                  htmlFor={field.name}
                  className="block text-sm font-semibold text-dark mb-2"
                >
                  {field.label}
                  {field.required && <span className="text-red-500">*</span>}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    required={field.required}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                ) : (
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    required={field.required}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                )}
              </div>
            ))}
            <Button className="w-full">Submit</Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
