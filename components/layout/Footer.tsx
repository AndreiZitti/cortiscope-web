import React from "react";
import { FOOTER } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="text-2xl font-bold text-primary mb-2">
              Cortiscope
            </div>
            <p className="text-gray-400">{FOOTER.copyright}</p>
          </div>

          <div className="flex gap-6">
            {FOOTER.links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-gray-400 hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
