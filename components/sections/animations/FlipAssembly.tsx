"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { PROBLEMS, SOLUTIONS } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);

export default function FlipAssembly() {
  const containerRef = useRef<HTMLElement>(null);
  const problemSectionRef = useRef<HTMLDivElement>(null);
  const assemblyAreaRef = useRef<HTMLDivElement>(null);
  const logoSectionRef = useRef<HTMLDivElement>(null);
  const solutionSectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (
      !containerRef.current ||
      !problemSectionRef.current ||
      !assemblyAreaRef.current ||
      !logoSectionRef.current ||
      !solutionSectionRef.current ||
      !svgRef.current
    )
      return;

    const container = containerRef.current;
    const problemSection = problemSectionRef.current;
    const assemblyArea = assemblyAreaRef.current;
    const logoSection = logoSectionRef.current;
    const solutionSection = solutionSectionRef.current;
    const svg = svgRef.current;

    const problemTexts = problemSection.querySelectorAll('.problem-text');
    const problemTitle = problemSection.querySelector('h2');
    const morphPaths = problemSection.querySelectorAll('.morph-rect');
    const finalLogo = assemblyArea.querySelector('.final-logo');
    const solutionCards = solutionSection.querySelectorAll('.solution-card');

    let ctx: gsap.Context;

    const timer = setTimeout(() => {
      // Set initial states
      gsap.set(problemTexts, { opacity: 0, y: 50 });
      gsap.set(morphPaths, { opacity: 0 });
      gsap.set(finalLogo, { opacity: 0 });
      gsap.set(logoSection, { opacity: 0 });
      gsap.set(solutionSection, { opacity: 0 });
      gsap.set(solutionCards, { opacity: 0, y: 30 });

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: '+=300%',
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        // Timeline 1: Problems appear (0% - 15%)
        // Show problem boxes (SVG rectangles)
        tl.to(
          morphPaths,
          {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
          },
          0
        );

        // Show problem text on top of boxes
        tl.to(
          problemTexts,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out',
          },
          0.2
        );

        // Timeline 2: Fade out title and text (15% - 25%)
        tl.to(
          problemTitle,
          {
            opacity: 0,
            y: -20,
            duration: 0.4,
            ease: 'power2.in',
          },
          1.5
        );

        // Fade out problem text content (boxes stay visible)
        tl.to(
          problemTexts,
          {
            opacity: 0,
            duration: 0.4,
          },
          1.7
        );

        // Timeline 3: MORPH paths into logo pieces (25% - 50%)
        // Morph path 1 → top logo group
        tl.to(
          '#morph-path-1',
          {
            morphSVG: '#logo-top',
            fill: '#231F20',
            duration: 1.5,
            ease: 'power2.inOut',
          },
          2.5
        );

        // Morph path 2 → bottom-left logo group
        tl.to(
          '#morph-path-2',
          {
            morphSVG: '#logo-bottom-left',
            fill: '#231F20',
            duration: 1.5,
            ease: 'power2.inOut',
          },
          2.6
        );

        // Morph path 3 → center logo group (blue)
        tl.to(
          '#morph-path-3',
          {
            morphSVG: '#logo-center',
            fill: '#00AEEF',
            duration: 1.5,
            ease: 'power2.inOut',
          },
          2.7
        );

        // Timeline 4: Replace morphed paths with final logo (50% - 60%)
        tl.to(
          morphPaths,
          {
            opacity: 0,
            duration: 0.3,
          },
          4.0
        );

        tl.to(
          finalLogo,
          {
            opacity: 1,
            duration: 0.3,
          },
          4.1
        );

        // Glow effect
        tl.to(
          finalLogo,
          {
            filter: 'drop-shadow(0 0 20px rgba(0,174,239,0.6))',
            duration: 0.4,
            yoyo: true,
            repeat: 1,
          },
          4.5
        );

        // Timeline 5: Show solution title and cards (75% - 100%)
        tl.to(
          logoSection,
          {
            opacity: 1,
            duration: 0.3,
          },
          5.0
        );

        tl.to(
          solutionSection,
          {
            opacity: 1,
            duration: 0.3,
          },
          5.3
        );

        solutionCards.forEach((card, index) => {
          tl.to(
            card,
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'back.out(1.5)',
            },
            5.5 + index * 0.15
          );
        });
      }, container);
    }, 100);

    return () => {
      clearTimeout(timer);
      if (ctx) {
        ctx.revert();
      }
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-white overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      {/* Problems Section */}
      <div
        ref={problemSectionRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-10"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center text-dark mb-16">
          The Problem
        </h2>

        {/* Text content - positioned absolutely to stay on top */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6 mb-8 relative z-10">
          {PROBLEMS.map((problem, index) => (
            <div
              key={index}
              className="problem-text"
            >
              <h3 className="text-2xl font-bold text-dark mb-4">
                {problem.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>

        {/* SVG with problem boxes that will morph into logo pieces */}
        <svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          viewBox="0 0 1200 400"
          style={{ width: '100%', maxWidth: '1200px', height: 'auto' }}
        >
          {/* Box 1 - Problem card that morphs into top logo group */}
          <path
            id="morph-path-1"
            className="morph-rect problem-card"
            d="M 50 120 L 350 120 L 350 280 L 50 280 Z"
            fill="#F5F5F5"
            stroke="#E5E5E5"
            strokeWidth="2"
            rx="12"
          />

          {/* Box 2 - Problem card that morphs into bottom-left logo group */}
          <path
            id="morph-path-2"
            className="morph-rect problem-card"
            d="M 425 120 L 725 120 L 725 280 L 425 280 Z"
            fill="#F5F5F5"
            stroke="#E5E5E5"
            strokeWidth="2"
            rx="12"
          />

          {/* Box 3 - Problem card that morphs into center logo group */}
          <path
            id="morph-path-3"
            className="morph-rect problem-card"
            d="M 800 120 L 1100 120 L 1100 280 L 800 280 Z"
            fill="#F5F5F5"
            stroke="#E5E5E5"
            strokeWidth="2"
            rx="12"
          />
        </svg>
      </div>

      {/* Assembly Area - Logo pieces appear here after morph */}
      <div
        ref={assemblyAreaRef}
        className="absolute inset-0 flex items-center justify-center z-20"
      >
        <svg
          viewBox="0 0 81 111"
          className="w-64 h-auto"
        >
          {/* Hidden path definitions for morphing targets */}
          <defs>
            {/* Top Group (Black outer pieces) - Unified path */}
            <path
              id="logo-top"
              d="M29.5801 20.1746 L29.5801 34.3904 L24.5 37.323 L24.5 17.1238 L29.5801 20.1746 Z M51.6104 6.73047 L29.9561 19.2334 L24.9844 16.248 L51.6104 0.865234 L51.6104 6.73047 Z M79.2282 16.2383 L74.15 19.1621 L52.61 6.73047 L52.61 0.865234 L79.2282 16.2383 Z M79.7301 37.323 L74.65 34.3904 L74.65 20.0291 L79.7301 17.1043 L79.7301 37.323 Z"
            />

            {/* Bottom Left Group (Black outer pieces) - Unified path */}
            <path
              id="logo-bottom-left"
              d="M28.11 110.67 L28.12 103.65 L6.09 90.92 L0 94.43 L28.11 110.67 Z M28.11 110.67 L47.1 99.69 L41.02 96.18 L28.12 103.65 L28.11 110.67 Z M0 94.43 L6.09 90.92 L6.09 65.48 L0 61.96 L0 94.43 Z M0 61.96 L6.09 65.48 L19 58.02 L19 51 L0 61.96 Z"
            />

            {/* Center Group (Blue inner pieces) - Unified path */}
            <path
              id="logo-center"
              d="M49 87 L30 76 L24 80 L52 96 L49 87 Z M30 76 L30 54 L24 47 L24 80 L30 76 Z M30 54 L49 65 L52 60 L33.5 49 L24 47 L30 54 Z M52 31 L24 47 L33.5 49 L52 38 L52 31 Z M80.5 47 L52 31 L52 38 L71 49 L80.5 47 Z M71 49 L52 60 L55 65 L74 54 L80.5 47 L71 49 Z M80.5 79.6463 L80.5 47 L74 54 L74.5 76 L80.5 79.6463 Z M52 96 L80.5 79.6463 L74.5 76 L55.5 87 L52 96 Z M49 65 L49 87 L52 96 L55.5 87 L55 65 L49 65 Z M52 60 L49 65 L55 65 L52 60 Z"
            />
          </defs>

          {/* Actual logo that will be revealed */}
          <g className="final-logo" opacity="0">
            <path d="M29.5801 20.1746V34.3904L24.5 37.323V17.1238L29.5801 20.1746Z" fill="#231F20" />
            <path d="M51.6104 6.73047L29.9561 19.2334L24.9844 16.248L51.6104 0.865234V6.73047Z" fill="#231F20" />
            <path d="M79.2282 16.2383L74.15 19.1621L52.61 6.73047V0.865234L79.2282 16.2383Z" fill="#231F20" />
            <path d="M79.7301 37.323L74.65 34.3904V20.0291L79.7301 17.1043V37.323Z" fill="#231F20" />
            <path d="M28.11 110.67L28.12 103.65L6.09 90.92L0 94.43L28.11 110.67Z" fill="#231F20" />
            <path d="M28.11 110.67L47.1 99.69L41.02 96.18L41.03 96.19L28.12 103.65L28.11 110.67Z" fill="#231F20" />
            <path d="M0 94.43L6.09 90.92V65.48L0 61.96V94.43Z" fill="#231F20" />
            <path d="M0 61.96L6.09 65.48L19 58.02V51L0 61.96Z" fill="#231F20" />
            <path d="M49 87L30 76L24 80L52 96L49 87Z" fill="#00AEEF" />
            <path d="M30 76V54L24 47V80L30 76Z" fill="#00AEEF" />
            <path d="M30 54L49 65L52 60L33.5 49L24 47L30 54Z" fill="#00AEEF" />
            <path d="M52 31L24 47L33.5 49L52 38V31Z" fill="#00AEEF" />
            <path d="M80.5 47L52 31V38L71 49L80.5 47Z" fill="#00AEEF" />
            <path d="M71 49L52 60L55 65L74 54L80.5 47L71 49Z" fill="#00AEEF" />
            <path d="M80.5 79.6463V47L74 54L74.5 76L80.5 79.6463Z" fill="#00AEEF" />
            <path d="M52 96L80.5 79.6463L74.5 76L55.5 87L52 96Z" fill="#00AEEF" />
            <path d="M49 65V87L52 96L55.5 87L55 65H49Z" fill="#00AEEF" />
            <path d="M52 60L49 65H55L52 60Z" fill="#00AEEF" />
          </g>
        </svg>
      </div>

      {/* Solution Title (No duplicate logo - assembled pieces stay visible) */}
      <div
        ref={logoSectionRef}
        className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
      >
        <div className="text-center mt-64">
          <svg ref={svgRef} className="hidden">
            <path />
          </svg>
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            The Solution: NosoScan
          </h2>
        </div>
      </div>

      {/* Solution Section */}
      <div
        ref={solutionSectionRef}
        className="absolute inset-0 flex flex-col items-center justify-end pb-20 z-40"
      >
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          {SOLUTIONS.map((solution, index) => (
            <div
              key={index}
              className="solution-card p-8 bg-gradient-to-br from-primary to-blue-600 text-white rounded-xl shadow-2xl"
            >
              <h3 className="text-2xl font-bold mb-4">
                {solution.title}
              </h3>
              <p className="text-white/90 leading-relaxed">
                {solution.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
