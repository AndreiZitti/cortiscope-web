'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface FeatureCard {
  icon: string;
  color: string;
  title: string;
  body: string;
}

const features: FeatureCard[] = [
  {
    icon: '🔵',
    color: 'blue-500',
    title: 'Complete 3D Analysis',
    body: 'Reconstruct full volumetric tumor models for precise spatial understanding and treatment planning'
  },
  {
    icon: '🟣',
    color: 'purple-500',
    title: 'Uncertainty Metrics',
    body: 'Built-in confidence scoring shows exactly where the model is certain (green) or needs clinical review (red)'
  },
  {
    icon: '🟢',
    color: 'green-500',
    title: 'Runs Anywhere',
    body: '30,000 parameters vs 100M+ in competitors. Deploys on standard hospital CPUs—no GPU clusters required'
  }
];

const visualStates = [
  { label: 'Interactive 3D reconstruction', duration: 7000 },
  { label: 'Confidence visualization', duration: 7000 },
  { label: 'Efficient by design', duration: 7000 }
];

// Generate spherical point clouds outside component to avoid regeneration
// Helper function to generate points on a sphere surface
const generateSpherePoints = (count: number, radius: number) => {
  const points = [];
  for (let i = 0; i < count; i++) {
    // Use Fibonacci sphere algorithm for even distribution
    const phi = Math.acos(1 - 2 * (i + 0.5) / count);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    // Project 3D to 2D - keep it circular
    points.push({
      id: `${i}`,
      x: x,
      y: y,
      delay: Math.random() * 0.5,
    });
  }
  return points;
};

// Generate particles for morphing animation
// Start with 1000 particles (large sphere), morph to 50 (small sphere)
const sphereParticles = generateSpherePoints(1000, 100);
const targetPositions = generateSpherePoints(50, 40);

export default function BuiltForYou() {
  const [currentState, setCurrentState] = useState(0);
  const [hasCompletedFirstLoop, setHasCompletedFirstLoop] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const visualRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Auto-cycle through states, stop after first loop
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentState((prev) => {
        const next = (prev + 1) % 3;
        // If we're cycling back to 0 after going through all states
        if (next === 0 && prev === 2) {
          setHasCompletedFirstLoop(true);
          setAutoPlay(false); // Stop auto-cycling
        }
        return next;
      });
    }, 7000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  // Manual state change handler
  const handleStateChange = (index: number) => {
    setCurrentState(index);
    setAutoPlay(false); // Stop auto-play when user clicks
  };

  // Animate transitions with GSAP
  useEffect(() => {
    if (!labelRef.current) return;

    gsap.fromTo(
      labelRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );
  }, [currentState]);

  // Highlight active feature card
  useEffect(() => {
    featureRefs.current.forEach((ref, index) => {
      if (!ref) return;

      if (index === currentState) {
        gsap.to(ref, {
          scale: 1.05,
          backgroundColor: 'rgba(45, 156, 219, 0.1)',
          duration: 0.3,
          ease: 'power2.out'
        });
      } else {
        gsap.to(ref, {
          scale: 1,
          backgroundColor: 'transparent',
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    });
  }, [currentState]);

  // Control iframe rotation speed
  useEffect(() => {
    if (currentState !== 0 || !iframeRef.current) return;

    // Send message to iframe to slow down rotation
    const iframe = iframeRef.current;
    const sendMessage = () => {
      iframe.contentWindow?.postMessage({ type: 'slowRotation' }, '*');
    };

    // Wait for iframe to load
    iframe.addEventListener('load', sendMessage);

    return () => {
      iframe.removeEventListener('load', sendMessage);
    };
  }, [currentState]);

  return (
    <section className="relative min-h-screen bg-black flex items-center justify-center py-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Left side: Feature cards */}
          <div className="text-white space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Built for You
              </h2>
              <p className="text-xl text-gray-400">
                Clinical-ready AI that runs anywhere
              </p>
            </div>

            {features.map((feature, index) => (
              <div
                key={index}
                ref={(el) => { featureRefs.current[index] = el; }}
                className={`border-l-4 border-${feature.color} pl-6 rounded-r-lg p-4 -ml-4 transition-all cursor-pointer`}
                onClick={() => handleStateChange(index)}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`w-4 h-4 rounded-full bg-${feature.color}`}
                  ></div>
                  <h3 className="text-2xl font-bold">{feature.title}</h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {feature.body}
                </p>
              </div>
            ))}
          </div>

          {/* Right side: Cycling visualization */}
          <div className="relative">
            <div
              ref={visualRef}
              className="relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl"
              style={{ minHeight: '500px' }}
            >
              {/* State 0: 3D rotating tumor (iframe) */}
              {currentState === 0 && (
                <iframe
                  ref={iframeRef}
                  src="/brats_visualisations/brain_skull_tumor_custom_view.html"
                  className="w-full h-full absolute inset-0"
                  style={{ minHeight: '500px', border: 'none' }}
                  title="3D Brain Tumor Visualization"
                />
              )}

              {/* State 1: Uncertainty/AI Classification */}
              {currentState === 1 && (
                <div className="flex items-center justify-center w-full h-full absolute inset-0 p-8">
                  <div className="relative w-full h-full max-w-[500px] max-h-[500px]">
                    <Image
                      src="/brats_visualisations/overlay_assets/BraTS2021_00002_F90_ai_classification.png"
                      alt="AI Classification Overlay"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              )}

              {/* State 2: Side-by-side sphere comparison */}
              {currentState === 2 && (
                <div className="flex items-center justify-center w-full h-full absolute inset-0 bg-black">
                  <div className="relative w-full h-full flex items-center justify-center">

                    {/* Large sphere (left) - Industry Models */}
                    <div className="absolute left-[20%] top-1/2 -translate-y-1/2">
                      {sphereParticles.map((particle) => (
                        <motion.div
                          key={particle.id}
                          className="absolute w-[2px] h-[2px] rounded-full bg-red-400"
                          initial={{
                            x: particle.x,
                            y: particle.y,
                            opacity: 0
                          }}
                          animate={{
                            x: particle.x,
                            y: particle.y,
                            opacity: 0.8
                          }}
                          transition={{
                            duration: 0.5,
                            delay: particle.delay * 0.3,
                            ease: "easeOut"
                          }}
                          style={{
                            left: '50%',
                            top: '50%',
                            boxShadow: '0 0 4px rgba(239,68,68,0.8)'
                          }}
                        />
                      ))}

                      {/* Label */}
                      <motion.div
                        className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 text-center whitespace-nowrap"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        <div className="text-red-400 font-bold text-xl">Industry Models</div>
                        <div className="text-xs text-gray-400 mt-1">100M+ parameters</div>
                      </motion.div>
                    </div>

                    {/* VS text */}
                    <motion.div
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                    >
                      <div className="bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm text-white text-2xl font-bold">
                        VS
                      </div>
                    </motion.div>

                    {/* Small sphere (right) - Cortiscope */}
                    <div className="absolute right-[20%] top-1/2 -translate-y-1/2">
                      {targetPositions.map((particle) => (
                        <motion.div
                          key={particle.id}
                          className="absolute w-[3px] h-[3px] rounded-full bg-green-400"
                          initial={{
                            x: particle.x,
                            y: particle.y,
                            opacity: 0
                          }}
                          animate={{
                            x: particle.x,
                            y: particle.y,
                            opacity: 1
                          }}
                          transition={{
                            duration: 0.5,
                            delay: 0.5 + particle.delay * 0.3,
                            ease: "easeOut"
                          }}
                          style={{
                            left: '50%',
                            top: '50%',
                            boxShadow: '0 0 6px rgba(34,197,94,0.9)'
                          }}
                        />
                      ))}

                      {/* Label */}
                      <motion.div
                        className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                      >
                        <div className="text-green-400 font-bold text-xl">Cortiscope</div>
                        <div className="text-xs text-gray-400 mt-1">30K parameters</div>
                      </motion.div>
                    </div>

                    {/* Bottom text */}
                    <motion.div
                      className="absolute bottom-[15%] left-1/2 -translate-x-1/2 text-gray-300 text-base text-center font-medium"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1 }}
                    >
                      Same accuracy, <span className="text-green-400 font-bold">99.97%</span> fewer parameters
                    </motion.div>
                  </div>
                </div>
              )}

              {/* Label */}
              <div className="absolute bottom-6 left-6 right-6">
                <div
                  ref={labelRef}
                  className="bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg"
                >
                  <p className="text-white text-sm font-medium text-center">
                    {visualStates[currentState].label}
                  </p>
                </div>
              </div>
            </div>

            {/* State indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {visualStates.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleStateChange(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentState === index
                      ? 'bg-primary w-8'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`View state ${index + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
