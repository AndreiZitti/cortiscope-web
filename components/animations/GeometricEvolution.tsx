'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MorphSVGPlugin } from 'gsap-trial/MorphSVGPlugin';

gsap.registerPlugin(MorphSVGPlugin);

export default function GeometricEvolution() {
  const bluePieceRef = useRef<SVGPathElement>(null);
  const topPieceRef = useRef<SVGPathElement>(null);
  const bottomPieceRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Blue piece morphs from circle → triangle → square → pentagon → hexagon
      // All shapes centered at approximately (40.65, 54.18) - the logo's center point
      tl.fromTo(
        bluePieceRef.current,
        {
          opacity: 0,
          morphSVG: {
            shape: 'M40.65,54.18 L40.65,54.18 L40.65,54.18 L40.65,54.18 L40.65,54.18 L40.65,54.18 Z', // Point
          },
        },
        {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        },
        0
      );

      // Morph to circle (centered)
      tl.to(
        bluePieceRef.current,
        {
          morphSVG: {
            shape: 'M40.65,39.18 L50.65,44.18 L50.65,64.18 L40.65,69.18 L30.65,64.18 L30.65,44.18 Z', // Circle-like hexagon
          },
          duration: 0.5,
          ease: 'power2.inOut',
        },
        0.4
      );

      // Morph to triangle (centered at same point)
      tl.to(
        bluePieceRef.current,
        {
          morphSVG: {
            shape: 'M40.65,35 L60.65,70 L20.65,70 L20.65,70 L20.65,70 L40.65,35 Z',
          },
          duration: 0.5,
          ease: 'power2.inOut',
        },
        0.9
      );

      // Morph to square (centered at same point)
      tl.to(
        bluePieceRef.current,
        {
          morphSVG: {
            shape: 'M25.65,39.18 L55.65,39.18 L55.65,69.18 L25.65,69.18 L25.65,69.18 L25.65,39.18 Z',
          },
          duration: 0.5,
          ease: 'power2.inOut',
        },
        1.4
      );

      // Morph to pentagon (centered at same point)
      tl.to(
        bluePieceRef.current,
        {
          morphSVG: {
            shape: 'M40.65,35 L58.65,43 L52.65,65 L28.65,65 L22.65,43 L40.65,35 Z',
          },
          duration: 0.5,
          ease: 'power2.inOut',
        },
        1.9
      );

      // Morph to final logo hexagon shape
      tl.to(
        bluePieceRef.current,
        {
          morphSVG: {
            shape: 'M75.23,41.69l-22.04-12.73-22.03,12.72-3.04,1.76-3.04,1.75v32.46l22.04,12.73,6.07,3.51,3.05-1.76,25.07-14.47v-32.46l-6.08-3.51ZM53.19,35.98l19,10.97-18.99,10.97-19-10.97,18.99-10.97ZM31.15,74.15v-21.93l19,10.97v21.93l-19-10.97ZM75.23,74.15l-18.99,10.96v-21.92l18.99-10.97v21.93Z',
          },
          duration: 0.7,
          ease: 'back.out(1.2)',
        },
        2.4
      );

      // Color change during final morph
      tl.to(
        bluePieceRef.current,
        {
          fill: '#00aeef',
          duration: 0.4,
          ease: 'power2.out',
        },
        2.6
      );

      // Top piece slides in
      tl.fromTo(
        topPieceRef.current,
        {
          opacity: 0,
          y: -50,
          scale: 0.3,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(2)',
        },
        2.8
      );

      // Bottom piece slides in
      tl.fromTo(
        bottomPieceRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.3,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(2)',
        },
        3
      );

      // Glow effect during morphing
      tl.fromTo(
        glowRef.current,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 0.5,
          scale: 1.3,
          duration: 1.8,
          ease: 'power2.out',
        },
        0.5
      ).to(
        glowRef.current,
        {
          opacity: 0,
          scale: 2,
          duration: 1.2,
          ease: 'power2.in',
        },
        2.2
      );

      // Final satisfying pulse
      tl.to(
        [bluePieceRef.current, topPieceRef.current, bottomPieceRef.current],
        {
          scale: 1.1,
          duration: 0.2,
          ease: 'power2.out',
          yoyo: true,
          repeat: 1,
        },
        3.6
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-[120px] h-[160px]">
      {/* Glow effect */}
      <div
        ref={glowRef}
        className="absolute inset-0 flex items-center justify-center blur-2xl pointer-events-none"
        style={{ opacity: 0 }}
      >
        <div className="w-32 h-32 bg-blue-500 rounded-full" />
      </div>

      {/* Logo SVG */}
      <svg
        width="120"
        height="160"
        viewBox="0 0 81.31 108.37"
        className="relative z-10"
      >
        {/* Blue center piece - morphs through shapes */}
        <path
          ref={bluePieceRef}
          d="M40.65,54.18 L40.65,54.18 L40.65,54.18 L40.65,54.18 L40.65,54.18 L40.65,54.18 Z"
          fill="#7c7c7c"
          style={{ transformOrigin: '40.65px 54.18px' }}
        />

        {/* Top black piece */}
        <path
          ref={topPieceRef}
          d="M53.19,0l-28.11,16.24v21.95l6.08-3.51v-14.94l22.03-12.72,22.04,12.72v14.94l6.08,3.51v-21.95L53.19,0Z"
          fill="#231f20"
          style={{ transformOrigin: '40.65px 19.1px', opacity: 0 }}
        />

        {/* Bottom black piece */}
        <path
          ref={bottomPieceRef}
          d="M41.03,93.89l-12.91,7.46-22.03-12.73v-25.44l12.91-7.46v-7.02L0,59.66v32.47l28.11,16.24,18.99-10.98-6.08-3.51Z"
          fill="#231f20"
          style={{ transformOrigin: '20.5px 84px', opacity: 0 }}
        />
      </svg>
    </div>
  );
}
