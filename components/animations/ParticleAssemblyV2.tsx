'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap-trial/DrawSVGPlugin';

gsap.registerPlugin(DrawSVGPlugin);

export default function ParticleAssemblyV2() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bluePieceRef = useRef<SVGPathElement>(null);
  const topPieceRef = useRef<SVGPathElement>(null);
  const bottomPieceRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Create and animate particles
      const particleCount = 60;
      const particles: HTMLDivElement[] = [];

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute rounded-sm';
        particle.style.width = `${Math.random() * 3 + 1}px`;
        particle.style.height = `${Math.random() * 3 + 1}px`;
        particle.style.left = '50%';
        particle.style.top = '50%';
        particle.style.backgroundColor = i < particleCount * 0.7 ? '#00aeef' : '#231f20';
        containerRef.current?.appendChild(particle);
        particles.push(particle);

        const angle = (Math.random() * Math.PI * 2);
        const distance = Math.random() * 200 + 100;
        const targetX = Math.cos(angle) * distance;
        const targetY = Math.sin(angle) * distance;

        // Particles fly in from scattered positions
        tl.fromTo(
          particle,
          {
            x: targetX,
            y: targetY,
            opacity: 0,
            scale: 0,
            rotation: Math.random() * 360,
          },
          {
            x: 0,
            y: 0,
            opacity: 0.8,
            scale: 1,
            rotation: 0,
            duration: 1,
            ease: 'power3.out',
          },
          Math.random() * 0.3
        );

        // Particles fade out as logo forms
        tl.to(
          particle,
          {
            opacity: 0,
            scale: 0.5,
            duration: 0.4,
            ease: 'power2.in',
          },
          0.8 + Math.random() * 0.2
        );
      }

      // Logo paths draw with DrawSVG
      tl.fromTo(
        bluePieceRef.current,
        {
          drawSVG: '0%',
          opacity: 0,
        },
        {
          drawSVG: '100%',
          opacity: 1,
          duration: 1,
          ease: 'power2.inOut',
        },
        1
      );

      tl.fromTo(
        topPieceRef.current,
        {
          drawSVG: '0%',
          opacity: 0,
        },
        {
          drawSVG: '100%',
          opacity: 1,
          duration: 0.8,
          ease: 'power2.inOut',
        },
        1.3
      );

      tl.fromTo(
        bottomPieceRef.current,
        {
          drawSVG: '0%',
          opacity: 0,
        },
        {
          drawSVG: '100%',
          opacity: 1,
          duration: 0.8,
          ease: 'power2.inOut',
        },
        1.5
      );

      // Fill the paths
      tl.to(
        bluePieceRef.current,
        {
          fill: '#00aeef',
          attr: { 'stroke-width': 0 },
          duration: 0.4,
          ease: 'power2.out',
        },
        2
      );

      tl.to(
        [topPieceRef.current, bottomPieceRef.current],
        {
          fill: '#231f20',
          attr: { 'stroke-width': 0 },
          duration: 0.4,
          ease: 'power2.out',
        },
        2.1
      );

      // Elastic snap effect
      tl.to(
        svgRef.current,
        {
          scale: 1.15,
          duration: 0.2,
          ease: 'power2.out',
        },
        2.3
      ).to(
        svgRef.current,
        {
          scale: 1,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
        },
        2.5
      );

      // Energy burst
      const burst = document.createElement('div');
      burst.className = 'absolute inset-0 flex items-center justify-center pointer-events-none';
      burst.innerHTML = '<div class="w-16 h-16 border-2 border-blue-400 rounded-full"></div>';
      containerRef.current?.appendChild(burst);

      tl.fromTo(
        burst,
        {
          scale: 0,
          opacity: 0.8,
        },
        {
          scale: 3.5,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        2.3
      );

      // Multiple ripples
      for (let i = 0; i < 3; i++) {
        const ripple = document.createElement('div');
        ripple.className = 'absolute inset-0 flex items-center justify-center pointer-events-none';
        ripple.innerHTML = '<div class="w-20 h-20 border border-blue-300 rounded-full"></div>';
        containerRef.current?.appendChild(ripple);

        tl.fromTo(
          ripple,
          {
            scale: 0.5,
            opacity: 0.4,
          },
          {
            scale: 2.5 + i * 0.5,
            opacity: 0,
            duration: 1 + i * 0.2,
            ease: 'power1.out',
          },
          2.4 + i * 0.15
        );
      }

      // Final pulse
      tl.to(
        svgRef.current,
        {
          scale: 1.08,
          duration: 0.15,
          ease: 'power2.out',
          yoyo: true,
          repeat: 1,
        },
        3.2
      );

      // Cleanup particles after animation
      tl.call(() => {
        particles.forEach(p => p.remove());
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-[120px] h-[160px]">
      {/* Logo SVG */}
      <svg
        ref={svgRef}
        width="120"
        height="160"
        viewBox="0 0 81.31 108.37"
        className="relative z-10"
        style={{ transformOrigin: '50% 50%' }}
      >
        {/* Blue center hexagon */}
        <path
          ref={bluePieceRef}
          d="M75.23,41.69l-22.04-12.73-22.03,12.72-3.04,1.76-3.04,1.75v32.46l22.04,12.73,6.07,3.51,3.05-1.76,25.07-14.47v-32.46l-6.08-3.51ZM53.19,35.98l19,10.97-18.99,10.97-19-10.97,18.99-10.97ZM31.15,74.15v-21.93l19,10.97v21.93l-19-10.97ZM75.23,74.15l-18.99,10.96v-21.92l18.99-10.97v21.93Z"
          stroke="#00aeef"
          strokeWidth="2"
          fill="none"
          opacity="0"
        />

        {/* Top black piece */}
        <path
          ref={topPieceRef}
          d="M53.19,0l-28.11,16.24v21.95l6.08-3.51v-14.94l22.03-12.72,22.04,12.72v14.94l6.08,3.51v-21.95L53.19,0Z"
          stroke="#231f20"
          strokeWidth="2"
          fill="none"
          opacity="0"
        />

        {/* Bottom black piece */}
        <path
          ref={bottomPieceRef}
          d="M41.03,93.89l-12.91,7.46-22.03-12.73v-25.44l12.91-7.46v-7.02L0,59.66v32.47l28.11,16.24,18.99-10.98-6.08-3.51Z"
          stroke="#231f20"
          strokeWidth="2"
          fill="none"
          opacity="0"
        />
      </svg>
    </div>
  );
}
