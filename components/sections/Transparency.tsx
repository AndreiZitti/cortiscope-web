'use client';

import { useEffect, useRef, useState } from 'react';

export default function Transparency() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const brainImageRef = useRef<HTMLImageElement | null>(null);
  const aiImageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const brainImg = new Image();
    const aiImg = new Image();

    let loadedCount = 0;
    const totalImages = 2;

    const checkLoaded = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        brainImageRef.current = brainImg;
        aiImageRef.current = aiImg;
        setImagesLoaded(true);
      }
    };

    brainImg.onload = checkLoaded;
    aiImg.onload = checkLoaded;

    brainImg.src = '/brats_visualisations/exported_slices/BraTS2021_00002_F90_brain.png';
    aiImg.src = '/brats_visualisations/overlay_assets/BraTS2021_00002_F90_ai_classification.png';

    return () => {
      brainImg.onload = null;
      aiImg.onload = null;
    };
  }, []);

  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current || !brainImageRef.current || !aiImageRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = brainImageRef.current.width;
    canvas.height = brainImageRef.current.height;

    ctx.drawImage(brainImageRef.current, 0, 0);
    ctx.drawImage(aiImageRef.current, 0, 0);
  }, [imagesLoaded]);

  return (
    <section className="relative min-h-screen bg-black flex items-center justify-center py-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          <div className="text-white space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-12">
              Built for Transparency
            </h2>

            <div className="border-l-4 border-green-500 pl-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <h3 className="text-2xl font-bold">Source Attribution</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Every boundary point links back to biological features
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                <h3 className="text-2xl font-bold">Physical Validation</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Predictions obey tumor growth physics
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                <h3 className="text-2xl font-bold">Confidence Scoring</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                AI provides uncertainty metrics for clinical review
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
              {!imagesLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white">Loading...</div>
                </div>
              )}
              <canvas
                ref={canvasRef}
                className="w-full h-auto"
                style={{ display: 'block' }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
