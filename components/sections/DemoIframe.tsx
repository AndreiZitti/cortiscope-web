"use client";

import React, { useState } from "react";

export default function DemoIframe() {
  const [hasError, setHasError] = useState(false);

  return (
    <section
      id="demo-iframe"
      className="relative min-h-screen bg-black py-20"
    >
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
          Try NosoScan
        </h2>
        <div style={{ position: 'relative', paddingBottom: '75%', height: 0, overflow: 'hidden' }}>
          {hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 rounded-lg border border-gray-700">
              <div className="text-center p-8">
                <p className="text-white mb-4">Demo cannot be embedded due to X-Frame-Options.</p>
                <a
                  href="https://aesthetic-rugelach-811b95.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Open Demo in New Tab
                </a>
              </div>
            </div>
          )}
          <iframe
            src="https://aesthetic-rugelach-811b95.netlify.app/"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              display: hasError ? 'none' : 'block'
            }}
            frameBorder="0"
            allowFullScreen
            onError={() => setHasError(true)}
          />
        </div>
      </div>
    </section>
  );
}
