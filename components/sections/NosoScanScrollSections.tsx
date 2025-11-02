'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function NosoScanScrollSections() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [currentSection, setCurrentSection] = useState<'differently' | 'transparency' | 'features'>('differently');

  // Image refs
  const brainImageRef = useRef<HTMLImageElement | null>(null);
  const maskImageRef = useRef<HTMLImageElement | null>(null);
  const biologyImageRef = useRef<HTMLImageElement | null>(null);
  const physicsImageRef = useRef<HTMLImageElement | null>(null);
  const aiImageRef = useRef<HTMLImageElement | null>(null);

  const tumorCenterRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const maskDataRef = useRef<ImageData | null>(null);

  // Load images
  useEffect(() => {
    const brainImg = new Image();
    const maskImg = new Image();
    const biologyImg = new Image();
    const physicsImg = new Image();
    const aiImg = new Image();

    let loadedCount = 0;
    const totalImages = 5;

    const checkLoaded = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        brainImageRef.current = brainImg;
        maskImageRef.current = maskImg;
        biologyImageRef.current = biologyImg;
        physicsImageRef.current = physicsImg;
        aiImageRef.current = aiImg;
        setImagesLoaded(true);
      }
    };

    brainImg.onload = checkLoaded;
    maskImg.onload = checkLoaded;
    biologyImg.onload = checkLoaded;
    physicsImg.onload = checkLoaded;
    aiImg.onload = checkLoaded;

    brainImg.src = '/brats_visualisations/exported_slices/BraTS2021_00002_F90_brain.png';
    maskImg.src = '/brats_visualisations/exported_slices/BraTS2021_00002_F90_mask.png';
    biologyImg.src = '/brats_visualisations/overlay_assets/BraTS2021_00002_F90_biology.png';
    physicsImg.src = '/brats_visualisations/overlay_assets/BraTS2021_00002_F90_physics.png';
    aiImg.src = '/brats_visualisations/overlay_assets/BraTS2021_00002_F90_ai_classification.png';

    return () => {
      brainImg.onload = null;
      maskImg.onload = null;
      biologyImg.onload = null;
      physicsImg.onload = null;
      aiImg.onload = null;
    };
  }, []);

  // Setup canvas and find tumor boundary points
  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current || !brainImageRef.current || !maskImageRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = brainImageRef.current.width;
    canvas.height = brainImageRef.current.height;

    // Cache mask data and find tumor center
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = maskImageRef.current.width;
    tempCanvas.height = maskImageRef.current.height;
    const tempCtx = tempCanvas.getContext('2d');

    if (tempCtx && maskImageRef.current) {
      tempCtx.drawImage(maskImageRef.current, 0, 0);
      const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
      maskDataRef.current = imageData;
      const data = imageData.data;

      let sumX = 0, sumY = 0, count = 0;

      for (let y = 0; y < tempCanvas.height; y++) {
        for (let x = 0; x < tempCanvas.width; x++) {
          const idx = (y * tempCanvas.width + x) * 4;
          if (data[idx] > 10 || data[idx + 1] > 10 || data[idx + 2] > 10) {
            sumX += x;
            sumY += y;
            count++;
          }
        }
      }

      const centerX = count > 0 ? sumX / count : canvas.width / 2;
      const centerY = count > 0 ? sumY / count : canvas.height / 2;
      tumorCenterRef.current = { x: centerX, y: centerY };
    }

    // Draw initial state
    ctx.drawImage(brainImageRef.current, 0, 0);
    ctx.globalAlpha = 0.8;
    ctx.drawImage(maskImageRef.current, 0, 0);

  }, [imagesLoaded]);

  // Setup ScrollTrigger animations
  useEffect(() => {
    if (!imagesLoaded || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Pin the visualization while scrolling through sections
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=300%',
        pin: '.visualization-container',
        pinSpacing: true,
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;

          // Section transitions based on scroll progress
          if (progress < 0.33) {
            setCurrentSection('differently');
          } else if (progress < 0.66) {
            setCurrentSection('transparency');
          } else {
            setCurrentSection('features');
          }
        }
      });

      // Text fade transitions
      gsap.to('.section-text-differently', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=33%',
          scrub: true,
        },
        opacity: 0,
        y: -50,
      });

      gsap.fromTo('.section-text-transparency',
        { opacity: 0, y: 50 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: '+=33%',
            end: '+=66%',
            scrub: true,
          },
          opacity: 1,
          y: 0,
        }
      );

      gsap.to('.section-text-transparency', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: '+=66%',
          end: '+=100%',
          scrub: true,
        },
        opacity: 0,
        y: -50,
      });

      gsap.fromTo('.section-text-features',
        { opacity: 0, y: 50 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: '+=100%',
            end: '+=133%',
            scrub: true,
          },
          opacity: 1,
          y: 0,
        }
      );

    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [imagesLoaded]);

  // Animate branch network for transparency section
  useEffect(() => {
    if (currentSection !== 'transparency' || !svgRef.current) return;

    const svg = svgRef.current;
    const branches = svg.querySelectorAll('.branch-path');

    const tl = gsap.timeline({ repeat: -1 });

    // Animate each branch
    branches.forEach((branch, i) => {
      tl.fromTo(branch,
        { strokeDashoffset: 1000 },
        { strokeDashoffset: 0, duration: 0.8, ease: 'power2.out' },
        i * 1.5
      );
      tl.to(branch, { opacity: 0, duration: 0.4 }, i * 1.5 + 2);
    });

    return () => {
      tl.kill();
    };
  }, [currentSection]);

  return (
    <section ref={containerRef} className="relative bg-black">
      <div className="min-h-[400vh]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">

            {/* Left: Text Content (changes on scroll) */}
            <div className="relative min-h-screen flex items-center">
              <div className="text-white space-y-6">

                {/* Section 1: Why NosoScan Works Differently */}
                <div className="section-text-differently">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    Why NosoScan Works Differently
                  </h2>
                  <p className="text-lg text-gray-300">
                    Watch how biology, physics, and AI work together to identify brain tumors
                    with unprecedented accuracy.
                  </p>
                  <div className="space-y-3 mt-8">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-sm">Biology guides</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="text-sm">Physics informs</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      <span className="text-sm">AI supports</span>
                    </div>
                  </div>
                </div>

                {/* Section 2: Built for Transparency */}
                <div className="section-text-transparency absolute top-0 opacity-0">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    Built for Transparency
                  </h2>
                  <p className="text-lg text-gray-300">
                    Every prediction is traceable. See exactly how biology, physics, and AI
                    contributed to each segmentation decision.
                  </p>
                  <div className="space-y-4 mt-8">
                    <div className="border-l-4 border-green-500 pl-4">
                      <h3 className="font-semibold">Tissue boundary respected</h3>
                      <p className="text-sm text-gray-400">Biological constraints guide growth</p>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h3 className="font-semibold">Diffusion constraint applied</h3>
                      <p className="text-sm text-gray-400">Physics models tumor behavior</p>
                    </div>
                    <div className="border-l-4 border-purple-500 pl-4">
                      <h3 className="font-semibold">Neural pattern activated</h3>
                      <p className="text-sm text-gray-400">AI identifies subtle patterns</p>
                    </div>
                  </div>
                </div>

                {/* Section 3: What You Get */}
                <div className="section-text-features absolute top-0 opacity-0">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    What You Get
                  </h2>
                  <p className="text-lg text-gray-300">
                    Complete diagnostic tools in one platform
                  </p>
                  <div className="space-y-3 mt-8">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center">
                        <span className="text-blue-400">3D</span>
                      </div>
                      <span className="text-sm">Full 3D reconstruction</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-green-500/20 flex items-center justify-center">
                        <span className="text-green-400">📊</span>
                      </div>
                      <span className="text-sm">Confidence visualization</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-purple-500/20 flex items-center justify-center">
                        <span className="text-purple-400">🔬</span>
                      </div>
                      <span className="text-sm">Tissue classification</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-orange-500/20 flex items-center justify-center">
                        <span className="text-orange-400">#</span>
                      </div>
                      <span className="text-sm">Quantitative metrics</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Right: Pinned Visualization (stays in place) */}
            <div className="visualization-container relative min-h-screen flex items-center">
              <div className="relative w-full">
                <div className="relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
                  {!imagesLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white">Loading...</div>
                    </div>
                  )}

                  {/* Canvas for scan display */}
                  <canvas
                    ref={canvasRef}
                    className="w-full h-auto relative z-10"
                    style={{ display: 'block' }}
                  />

                  {/* SVG overlay for branch network (Section 3) */}
                  {currentSection === 'transparency' && (
                    <svg
                      ref={svgRef}
                      className="absolute inset-0 w-full h-full z-20 pointer-events-none"
                      viewBox="0 0 512 512"
                    >
                      {/* Branch 1 */}
                      <path
                        className="branch-path"
                        d="M 250 200 L 400 200 L 420 180"
                        stroke="#00ff00"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="1000"
                        strokeDashoffset="1000"
                        opacity="0"
                      />
                      {/* Branch 2 */}
                      <path
                        className="branch-path"
                        d="M 280 250 L 430 250 L 450 250"
                        stroke="#0066ff"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="1000"
                        strokeDashoffset="1000"
                        opacity="0"
                      />
                      {/* Branch 3 */}
                      <path
                        className="branch-path"
                        d="M 260 300 L 410 300 L 430 320"
                        stroke="#cc00ff"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="1000"
                        strokeDashoffset="1000"
                        opacity="0"
                      />
                    </svg>
                  )}

                  {/* 3D placeholder for Section 4 */}
                  {currentSection === 'features' && (
                    <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/50">
                      <div className="text-white text-center">
                        <div className="text-4xl mb-4">🧊</div>
                        <div className="text-sm">3D Visualization</div>
                        <div className="text-xs text-gray-400 mt-2">
                          (Three.js to be implemented)
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
