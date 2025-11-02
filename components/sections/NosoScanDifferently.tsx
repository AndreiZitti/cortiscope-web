'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  angle: number;
  distance: number;
  maxDistance: number;
  speed: number;
  size: number;
  active: boolean;
}

export default function NosoScanDifferently() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  // Store loaded images
  const brainImageRef = useRef<HTMLImageElement | null>(null);
  const maskImageRef = useRef<HTMLImageElement | null>(null);
  const biologyImageRef = useRef<HTMLImageElement | null>(null);
  const physicsImageRef = useRef<HTMLImageElement | null>(null);
  const aiImageRef = useRef<HTMLImageElement | null>(null);

  // Animation state
  const particlesRef = useRef<Particle[]>([]);
  const maskDataRef = useRef<ImageData | null>(null);
  const tumorCenterRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const timelineRef = useRef<gsap.core.Timeline>();

  // Load all images
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

  // Setup canvas, cache mask data, and initialize particles
  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current || !brainImageRef.current || !maskImageRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Set canvas size to match image
    canvas.width = brainImageRef.current.width;
    canvas.height = brainImageRef.current.height;

    // Cache mask pixel data
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = maskImageRef.current.width;
    tempCanvas.height = maskImageRef.current.height;
    const tempCtx = tempCanvas.getContext('2d');

    if (tempCtx && maskImageRef.current) {
      tempCtx.drawImage(maskImageRef.current, 0, 0);
      const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
      maskDataRef.current = imageData;
      const data = imageData.data;

      // Find tumor center
      let sumX = 0, sumY = 0, count = 0;

      for (let y = 0; y < tempCanvas.height; y++) {
        for (let x = 0; x < tempCanvas.width; x++) {
          const idx = (y * tempCanvas.width + x) * 4;
          // Check if pixel is part of tumor (non-black)
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

      // Initialize particle system (300 particles in radial pattern)
      const particles: Particle[] = [];
      const numParticles = 300;

      for (let i = 0; i < numParticles; i++) {
        const angle = (i / numParticles) * Math.PI * 2;
        const maxDist = Math.random() * 80 + 40; // Random distance 40-120px

        particles.push({
          x: centerX,
          y: centerY,
          targetX: centerX + Math.cos(angle) * maxDist,
          targetY: centerY + Math.sin(angle) * maxDist,
          angle: angle,
          distance: 0,
          maxDistance: maxDist,
          speed: 0.5 + Math.random() * 0.5,
          size: 1 + Math.random() * 2,
          active: false
        });
      }

      particlesRef.current = particles;
    }

    // Draw initial state (just the brain scan)
    ctx.drawImage(brainImageRef.current, 0, 0);

  }, [imagesLoaded]);

  // Main animation timeline
  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current || !brainImageRef.current || !maskImageRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Create GSAP timeline
    const tl = gsap.timeline({
      paused: true,
      onUpdate: () => {
        drawFrame();
      },
      onComplete: () => {
        setAnimationComplete(true);
      }
    });

    timelineRef.current = tl;

    // Animation state object for GSAP to tween
    const animState = {
      seedPulse: 0,           // 0 to 1 for seed pulse
      particleProgress: 0,    // 0 to 1 for particle expansion
      waveRadius: 0,          // 0 to max for wave growth
      waveOpacity: 0,         // 0 to 1 for wave visibility
      biologyOverlay: 0,      // 0 to 1 for biology constraint
      physicsOverlay: 0,      // 0 to 1 for physics constraint
      aiOverlay: 0,           // 0 to 1 for AI constraint
      progressiveMask: 0,     // 0 to 1 for progressive mask reveal
      finalSegment: 0,        // 0 to 1 for final segmentation
    };

    const centerX = tumorCenterRef.current.x;
    const centerY = tumorCenterRef.current.y;
    const maxRadius = Math.sqrt(
      Math.pow(canvas.width - centerX, 2) +
      Math.pow(canvas.height - centerY, 2)
    );

    // Step 1: Seed pulse (0.5s)
    tl.to(animState, {
      seedPulse: 1,
      duration: 0.5,
      ease: 'sine.inOut',
      repeat: 1,
      yoyo: true
    });

    // Step 2: Wave propagation (2.5s) with particles
    tl.to(animState, {
      waveRadius: maxRadius,
      waveOpacity: 1,
      particleProgress: 1,
      progressiveMask: 1,
      duration: 2.5,
      ease: 'power2.out'
    }, '+=0.1');

    // Step 3: Constraint overlays flash in during growth
    // Biology at 30% (0.75s into 2.5s wave = 1.75s remaining)
    tl.to(animState, {
      biologyOverlay: 1,
      duration: 0.3,
      ease: 'power2.out'
    }, '-=1.75');

    tl.to(animState, {
      biologyOverlay: 0,
      duration: 0.2,
      ease: 'power2.in'
    }, '+=0.3');

    // Physics at 60% (1.5s into wave = 1.0s remaining)
    tl.to(animState, {
      physicsOverlay: 1,
      duration: 0.3,
      ease: 'power2.out'
    }, '-=1.2');

    tl.to(animState, {
      physicsOverlay: 0,
      duration: 0.2,
      ease: 'power2.in'
    }, '+=0.3');

    // AI at 90% (2.25s into wave = 0.25s remaining)
    tl.to(animState, {
      aiOverlay: 1,
      duration: 0.3,
      ease: 'power2.out'
    }, '-=0.45');

    tl.to(animState, {
      aiOverlay: 0,
      duration: 0.2,
      ease: 'power2.in'
    }, '+=0.3');

    // Step 4: Final segmentation lock-in
    tl.to(animState, {
      finalSegment: 1,
      duration: 0.5,
      ease: 'power2.inOut'
    });

    // Hold state
    tl.to({}, { duration: 1 });

    // Helper: Check if pixel is on tumor mask
    function isOnMask(x: number, y: number): boolean {
      if (!maskDataRef.current) return false;

      const ix = Math.floor(x);
      const iy = Math.floor(y);

      if (ix < 0 || ix >= canvas.width || iy < 0 || iy >= canvas.height) return false;

      const idx = (iy * canvas.width + ix) * 4;
      const data = maskDataRef.current.data;

      return data[idx] > 10 || data[idx + 1] > 10 || data[idx + 2] > 10;
    }

    // Drawing function
    function drawFrame() {
      if (!ctx || !brainImageRef.current || !maskImageRef.current) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw brain scan (base layer)
      ctx.drawImage(brainImageRef.current, 0, 0);

      const centerX = tumorCenterRef.current.x;
      const centerY = tumorCenterRef.current.y;

      // Draw seed pulse
      if (animState.seedPulse > 0) {
        const pulseRadius = 3 + animState.seedPulse * 7;
        ctx.beginPath();
        ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 0, 0, ${1 - animState.seedPulse * 0.5})`;
        ctx.fill();
      }

      // Draw particles (cellular automaton effect)
      if (animState.particleProgress > 0) {
        ctx.save();

        particlesRef.current.forEach((particle, i) => {
          // Stagger particle activation
          const activationThreshold = (i / particlesRef.current.length) * 0.3;
          if (animState.particleProgress < activationThreshold) return;

          const progress = Math.min(1, (animState.particleProgress - activationThreshold) / 0.7);

          // Calculate current position
          const currentX = particle.x + (particle.targetX - particle.x) * progress;
          const currentY = particle.y + (particle.targetY - particle.y) * progress;

          // Only draw if on tumor mask
          if (!isOnMask(currentX, currentY)) return;

          // Color based on distance from center (red -> orange -> yellow)
          const distFromCenter = Math.sqrt(
            Math.pow(currentX - centerX, 2) +
            Math.pow(currentY - centerY, 2)
          );

          let r = 255;
          let g = 0;
          let b = 0;

          if (distFromCenter < 20) {
            // Red core
            g = 0;
          } else if (distFromCenter < 40) {
            // Red to orange
            g = ((distFromCenter - 20) / 20) * 128;
          } else {
            // Orange to yellow
            g = 128 + ((distFromCenter - 40) / 40) * 127;
          }

          ctx.fillStyle = `rgba(${r}, ${Math.floor(g)}, ${b}, 0.7)`;
          ctx.beginPath();
          ctx.arc(currentX, currentY, particle.size, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.restore();
      }

      // Draw wave propagation with gradient (constrained by mask)
      if (animState.waveRadius > 0) {
        ctx.save();

        // Create temporary canvas for wave
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext('2d');

        if (tempCtx) {
          // Draw radial gradient wave
          const gradient = tempCtx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, animState.waveRadius
          );
          gradient.addColorStop(0, `rgba(255, 0, 0, ${animState.waveOpacity * 0.5})`);
          gradient.addColorStop(0.5, `rgba(255, 128, 0, ${animState.waveOpacity * 0.4})`);
          gradient.addColorStop(1, `rgba(255, 255, 0, ${animState.waveOpacity * 0.2})`);

          tempCtx.beginPath();
          tempCtx.arc(centerX, centerY, animState.waveRadius, 0, Math.PI * 2);
          tempCtx.fillStyle = gradient;
          tempCtx.fill();

          // Apply mask as clipping
          tempCtx.globalCompositeOperation = 'destination-in';
          tempCtx.drawImage(maskImageRef.current, 0, 0);

          // Draw to main canvas
          ctx.drawImage(tempCanvas, 0, 0);
        }

        ctx.restore();
      }

      // Draw progressive mask reveal
      if (animState.progressiveMask > 0 && animState.progressiveMask < 1) {
        ctx.save();

        // Create distance-based mask reveal
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext('2d');

        if (tempCtx && maskDataRef.current) {
          tempCtx.drawImage(maskImageRef.current, 0, 0);
          const imageData = tempCtx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;

          const revealRadius = animState.progressiveMask * animState.waveRadius;

          for (let y = 0; y < canvas.height; y++) {
            for (let x = 0; x < canvas.width; x++) {
              const idx = (y * canvas.width + x) * 4;
              const dist = Math.sqrt(
                Math.pow(x - centerX, 2) +
                Math.pow(y - centerY, 2)
              );

              if (dist > revealRadius) {
                data[idx + 3] = 0; // Make transparent
              } else {
                // Fade in based on proximity to wave edge
                const edgeDist = revealRadius - dist;
                const fadeZone = 20;
                if (edgeDist < fadeZone) {
                  data[idx + 3] = Math.floor(data[idx + 3] * (edgeDist / fadeZone));
                }
              }
            }
          }

          tempCtx.putImageData(imageData, 0, 0);
          ctx.globalAlpha = 0.6;
          ctx.drawImage(tempCanvas, 0, 0);
        }

        ctx.restore();
      }

      // Draw constraint overlays with actual images
      if (animState.biologyOverlay > 0 && biologyImageRef.current) {
        ctx.save();
        ctx.globalAlpha = animState.biologyOverlay * 0.7;
        ctx.globalCompositeOperation = 'screen';
        ctx.drawImage(biologyImageRef.current, 0, 0);
        ctx.restore();
      }

      if (animState.physicsOverlay > 0 && physicsImageRef.current) {
        ctx.save();
        ctx.globalAlpha = animState.physicsOverlay * 0.8;
        ctx.globalCompositeOperation = 'screen';
        ctx.drawImage(physicsImageRef.current, 0, 0);
        ctx.restore();
      }

      if (animState.aiOverlay > 0 && aiImageRef.current) {
        ctx.save();
        ctx.globalAlpha = animState.aiOverlay * 0.6;
        ctx.globalCompositeOperation = 'screen';
        ctx.drawImage(aiImageRef.current, 0, 0);
        ctx.restore();
      }

      // Draw final segmentation (lock-in)
      if (animState.finalSegment > 0) {
        ctx.save();
        ctx.globalAlpha = animState.finalSegment;
        ctx.drawImage(maskImageRef.current, 0, 0);
        ctx.restore();
      }
    }

    return () => {
      tl.kill();
    };
  }, [imagesLoaded]);

  // Trigger animation on mount (or via scroll trigger later)
  const handlePlayAnimation = () => {
    if (timelineRef.current) {
      timelineRef.current.restart();
    }
  };

  return (
    <section ref={containerRef} className="relative min-h-screen bg-black flex items-center justify-center py-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left: Text Content */}
          <div className="text-white space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">
              Why NosoScan Works Differently
            </h2>
            <p className="text-lg text-gray-300">
              Watch how biology, physics, and AI work together to identify brain tumors
              with unprecedented accuracy.
            </p>

            {/* Labels that appear after animation */}
            <div className="space-y-3 mt-8">
              <div className="flex items-center gap-3 opacity-0"
                   style={{
                     opacity: animationComplete ? 1 : 0,
                     transition: 'opacity 0.5s ease-out'
                   }}>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm">Biology guides</span>
              </div>
              <div className="flex items-center gap-3 opacity-0"
                   style={{
                     opacity: animationComplete ? 1 : 0,
                     transition: 'opacity 0.5s ease-out 0.1s'
                   }}>
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm">Physics informs</span>
              </div>
              <div className="flex items-center gap-3 opacity-0"
                   style={{
                     opacity: animationComplete ? 1 : 0,
                     transition: 'opacity 0.5s ease-out 0.2s'
                   }}>
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-sm">AI supports</span>
              </div>
            </div>

            <button
              onClick={handlePlayAnimation}
              className="mt-8 px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
            >
              Replay Animation
            </button>
          </div>

          {/* Right: Canvas Animation */}
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
