'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ScrollProgressIndicator from '@/components/ui/ScrollProgressIndicator';

gsap.registerPlugin(ScrollTrigger);

// Feature data for each state
const featureSets = [
  {
    title: 'Why NosoScan Works Differently',
    features: [
      {
        color: 'green-500',
        title: 'Biology Informs',
        description: 'Built-in anatomical knowledge ensures realistic, biologically-plausible results'
      },
      {
        color: 'blue-500',
        title: 'Physics Guides',
        description: 'Mathematical rules and physical principles constrain predictions to obey natural laws'
      },
      {
        color: 'purple-500',
        title: 'AI Supports',
        description: 'Neural networks process scans with speed and precision, combining learned patterns with biological and physical constraints'
      }
    ],
    visualType: 'canvas' as const,
  },
  {
    title: 'Built for Transparency',
    features: [
      {
        color: 'green-500',
        title: 'Source Attribution',
        description: 'Every boundary point links back to biological features'
      },
      {
        color: 'blue-500',
        title: 'Physical Validation',
        description: 'Predictions obey tumor growth physics'
      },
      {
        color: 'purple-500',
        title: 'Confidence Scoring',
        description: 'AI provides uncertainty metrics for clinical review'
      }
    ],
    visualType: 'canvas' as const,
  },
  {
    title: 'Built for You',
    subtitle: 'Clinical-ready AI that runs anywhere',
    features: [
      {
        color: 'blue-500',
        title: 'Complete 3D Analysis',
        description: 'Reconstruct full volumetric tumor models for precise spatial understanding and treatment planning'
      },
      {
        color: 'purple-500',
        title: 'Uncertainty Metrics',
        description: 'Built-in confidence scoring shows exactly where the model is certain (green) or needs clinical review (red)'
      },
      {
        color: 'green-500',
        title: 'Runs Anywhere',
        description: '30,000 parameters vs 100M+ in competitors. Deploys on standard hospital CPUs—no GPU clusters required'
      }
    ],
    visualType: 'iframe' as const,
  }
];

// Generate spherical point clouds for BuiltForYou state
const generateSpherePoints = (count: number, radius: number) => {
  const points = [];
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(1 - 2 * (i + 0.5) / count);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    points.push({
      id: `${i}`,
      x: x,
      y: y,
      delay: Math.random() * 0.5,
    });
  }
  return points;
};

const sphereParticles = generateSpherePoints(1000, 100);
const targetPositions = generateSpherePoints(50, 40);

export default function UnifiedFeatureScroll() {
  const containerRef = useRef<HTMLElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [currentVisualState, setCurrentVisualState] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const brainImageRef = useRef<HTMLImageElement | null>(null);
  const aiImageRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Refs for each state's content
  const state1Ref = useRef<HTMLDivElement>(null);
  const state2Ref = useRef<HTMLDivElement>(null);
  const state3Ref = useRef<HTMLDivElement>(null);

  const visual1Ref = useRef<HTMLDivElement>(null);
  const visual2Ref = useRef<HTMLDivElement>(null);
  const visual3Ref = useRef<HTMLDivElement>(null);

  // Load images for canvas states
  useEffect(() => {
    const brainImg = new window.Image();
    const aiImg = new window.Image();

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

  // Draw canvas when images are loaded
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

  // GSAP ScrollTrigger animation
  useEffect(() => {
    if (!containerRef.current || !state1Ref.current || !state2Ref.current || !state3Ref.current ||
        !visual1Ref.current || !visual2Ref.current || !visual3Ref.current) return;

    const container = containerRef.current;
    const state1 = state1Ref.current;
    const state2 = state2Ref.current;
    const state3 = state3Ref.current;
    const visual1 = visual1Ref.current;
    const visual2 = visual2Ref.current;
    const visual3 = visual3Ref.current;

    let ctx: gsap.Context;

    // Longer delay to ensure SequentialEdgeDraw's ScrollTrigger is fully initialized
    const timer = setTimeout(() => {
      // Set initial states - container visible, content ready
      gsap.set(container, {
        opacity: 1,
        visibility: 'visible'
      });
      gsap.set([state2, state3], { opacity: 0, y: 20 });
      gsap.set([visual2, visual3], { opacity: 0 });
      gsap.set(state1, { opacity: 1, y: 0 });
      gsap.set(visual1, { opacity: 1 });

      // Force ScrollTrigger to recalculate positions after previous animations
      ScrollTrigger.refresh();

      ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=300%', // Increased from 200% to give more scroll room
          scrub: 1,
          pin: true,
          pinSpacing: true,
          pinReparent: false, // Prevent reparenting issues
          invalidateOnRefresh: true,
          preventOverlaps: true,
          fastScrollEnd: true,
          id: 'unified-feature-scroll',
          snap: {
            snapTo: [0, 0.3, 0.6, 1], // Snap to hold positions (0%, 30%, 60%, 100%)
            duration: 0.4, // Consistent snap duration
            delay: 0.3, // Longer delay - only snap when user stops scrolling
            ease: 'power2.inOut'
          },
          onUpdate: (self) => {
            const progress = self.progress;
            setScrollProgress(progress); // Update progress for indicator
            if (progress < 0.33) {
              setCurrentVisualState(0);
            } else if (progress < 0.66) {
              setCurrentVisualState(1);
            } else {
              setCurrentVisualState(2);
            }
          }
        },
      });

      // Timeline structure with longer hold states (now with 300% scroll):
      // 0-20%: Hold State 1
      // 20-25%: Transition State 1 -> State 2
      // 25-50%: Hold State 2
      // 50-55%: Transition State 2 -> State 3
      // 55-100%: Hold State 3 (longest hold at the end)

      // State 1 holds, then fades out at 20%
      tl.to(state1, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: 'power2.inOut'
      }, 1.2) // Start at 20% of timeline
      .to(visual1, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.inOut'
      }, 1.2);

      // State 2 fades in at 20%, holds until 50%
      tl.to(state2, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.inOut'
      }, 1.2)
      .to(visual2, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.inOut'
      }, 1.2);

      // State 2 fades out at 50%
      tl.to(state2, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: 'power2.inOut'
      }, 3)
      .to(visual2, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.inOut'
      }, 3);

      // State 3 fades in at 50%, holds until end (45% of scroll dedicated to last state)
      tl.to(state3, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.inOut'
      }, 3)
      .to(visual3, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.inOut'
      }, 3);
      }, container);
    }, 500); // Increased delay to allow previous ScrollTrigger to initialize

    return () => {
      clearTimeout(timer);
      if (ctx) {
        ctx.revert();
      }
    };
  }, []);

  return (
    <section
      id="unified-feature-scroll"
      ref={containerRef}
      className="relative min-h-screen bg-black flex items-center justify-center py-20"
    >
      {/* Progress Indicator */}
      <ScrollProgressIndicator progress={scrollProgress} />

      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Left side: Text content (3 states layered) */}
          <div className="relative min-h-[600px]">

            {/* State 1: Why Different */}
            <div ref={state1Ref} className="absolute inset-0 text-white space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-12">
                {featureSets[0].title}
              </h2>
              {featureSets[0].features.map((feature, index) => (
                <div key={index} className={`border-l-4 border-${feature.color} pl-6`}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-4 h-4 rounded-full bg-${feature.color}`}></div>
                    <h3 className="text-2xl font-bold">{feature.title}</h3>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            {/* State 2: Transparency */}
            <div ref={state2Ref} className="absolute inset-0 text-white space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-12">
                {featureSets[1].title}
              </h2>
              {featureSets[1].features.map((feature, index) => (
                <div key={index} className={`border-l-4 border-${feature.color} pl-6`}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-4 h-4 rounded-full bg-${feature.color}`}></div>
                    <h3 className="text-2xl font-bold">{feature.title}</h3>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            {/* State 3: Built for You */}
            <div ref={state3Ref} className="absolute inset-0 text-white space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  {featureSets[2].title}
                </h2>
                {featureSets[2].subtitle && (
                  <p className="text-xl text-gray-400">
                    {featureSets[2].subtitle}
                  </p>
                )}
              </div>
              {featureSets[2].features.map((feature, index) => (
                <div key={index} className={`border-l-4 border-${feature.color} pl-6`}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-4 h-4 rounded-full bg-${feature.color}`}></div>
                    <h3 className="text-2xl font-bold">{feature.title}</h3>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right side: Visuals (3 states layered) */}
          <div className="relative min-h-[600px]">

            {/* Visual 1: Canvas (for states 1 & 2) */}
            <div ref={visual1Ref} className="absolute inset-0">
              <div className="relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl h-full flex items-center justify-center">
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

            {/* Visual 2: Same canvas (reused for transparency state) */}
            <div ref={visual2Ref} className="absolute inset-0">
              <div className="relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl h-full flex items-center justify-center">
                {!imagesLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white">Loading...</div>
                  </div>
                )}
                <canvas
                  className="w-full h-auto"
                  style={{ display: 'block' }}
                />
              </div>
            </div>

            {/* Visual 3: 3D iframe or particle comparison */}
            <div ref={visual3Ref} className="absolute inset-0">
              <div className="relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl h-full">
                {currentVisualState === 2 && (
                  <iframe
                    src="/brats_visualisations/brain_skull_tumor_custom_view.html"
                    className="w-full h-full"
                    style={{ border: 'none' }}
                    title="3D Brain Tumor Visualization"
                  />
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
