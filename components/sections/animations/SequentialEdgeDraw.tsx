"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { PROBLEMS, SOLUTIONS } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

export default function SequentialEdgeDraw() {
  const containerRef = useRef<HTMLElement>(null);
  const problemSectionRef = useRef<HTMLDivElement>(null);
  const solutionSectionRef = useRef<HTMLDivElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const logoTextRef = useRef<HTMLHeadingElement>(null);
  const outerHexRef = useRef<SVGPathElement>(null);
  const innerHexRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (
      !containerRef.current ||
      !problemSectionRef.current ||
      !solutionSectionRef.current ||
      !logoContainerRef.current ||
      !logoTextRef.current ||
      !outerHexRef.current ||
      !innerHexRef.current ||
      !svgRef.current
    )
      return;

    const container = containerRef.current;
    const problemSection = problemSectionRef.current;
    const solutionSection = solutionSectionRef.current;
    const logoContainer = logoContainerRef.current;
    const logoText = logoTextRef.current;
    const outerHex = outerHexRef.current;
    const innerHex = innerHexRef.current;
    const svg = svgRef.current;

    const problemCards = problemSection.querySelectorAll('.problem-card');
    const problemTitle = problemSection.querySelector('h2');
    const solutionCards = solutionSection.querySelectorAll('.solution-card');
    const logoPaths = svg.querySelectorAll('path.logo-path');

    let ctx: gsap.Context;

    // Small delay to let React finish initial render
    const timer = setTimeout(() => {
      // Set initial states
      gsap.set(problemCards, { opacity: 0, y: 50 });
      gsap.set(problemTitle, { opacity: 1 });
      gsap.set(logoContainer, { opacity: 0, scale: 0.8 });
      gsap.set(logoText, { opacity: 0, y: 20 });
      gsap.set([outerHex, innerHex], { drawSVG: '0% 0%' });
      gsap.set(logoPaths, { opacity: 0 });
      gsap.set(solutionSection, { opacity: 0 });
      gsap.set(solutionCards, { opacity: 0 });

      ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=300%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          id: 'sequential-edge-draw',
          snap: {
            snapTo: 1 / 6, // Snap to intervals (6 states in the animation)
            duration: { min: 0.2, max: 0.5 },
            delay: 0.1,
            ease: 'power2.inOut'
          },
        },
      });

    // Timeline 1: Problems In (0% - 15%)
    tl.to(
      problemCards,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power2.out',
      },
      0
    );

    // Timeline 2: Transition (15% - 40%)
    // Fade out problem title first
    tl.to(
      problemTitle,
      {
        opacity: 0,
        y: -20,
        duration: 0.5,
      },
      1.5
    )
      // Blur and fade problems
      .to(
        problemCards,
        {
          opacity: 0.3,
          filter: 'blur(8px)',
          duration: 0.8,
        },
        1.5
      )
      // "The Solution:" text appears
      .to(
        logoText,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        1.8
      )
      // Logo container appears
      .to(
        logoContainer,
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
        },
        2
      );

    // Timeline 3: Logo Draw (40% - 70%)
    // Draw outer hexagon edges
    tl.to(
        outerHex,
        {
          drawSVG: '0% 100%',
          duration: 1.2,
          ease: 'power2.inOut',
        },
        2.5
      )
      // Fade all paths in when outer is complete
      .to(
        logoPaths,
        {
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
        },
        3.2
      )
      // Draw inner hexagon edges
      .to(
        innerHex,
        {
          drawSVG: '0% 100%',
          duration: 1,
          ease: 'power2.inOut',
        },
        3.5
      )
      // Fade out problems completely
      .to(
        problemCards,
        {
          opacity: 0,
          scale: 0.95,
          duration: 0.6,
        },
        4
      );

    // Timeline 4: Solutions In (70% - 100%)
    tl.to(
      solutionSection,
      {
        opacity: 1,
        duration: 0.3,
      },
      4.5
    );

    // Solutions appear from hexagon angles
    const angles = [-90, 150, 30]; // top, bottom-left, bottom-right
    const distance = 150;

    solutionCards.forEach((card, index) => {
      const angle = angles[index];
      const rad = (angle * Math.PI) / 180;
      const startX = Math.cos(rad) * distance;
      const startY = Math.sin(rad) * distance;

      tl.fromTo(
        card,
        {
          x: startX,
          y: startY,
          opacity: 0,
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        4.7 + index * 0.15
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
      id="sequential-edge-draw"
      ref={containerRef}
      className="relative min-h-screen bg-white overflow-hidden"
    >
      {/* Problems Section */}
      <div
        ref={problemSectionRef}
        className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center text-dark mb-16">
          The Problem
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          {PROBLEMS.map((problem, index) => (
            <div
              key={index}
              className="problem-card p-8 bg-light-gray rounded-xl"
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
      </div>

      {/* Logo and Solution Section Combined */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none -mt-16">
        <div ref={logoContainerRef} className="text-center mb-12">
          <h2
            ref={logoTextRef}
            className="text-4xl md:text-5xl font-bold text-primary mb-8"
          >
            The Solution: NosoScan
          </h2>
          <div className="relative">
            <svg
              ref={svgRef}
              viewBox="0 0 81 111"
              className="w-40 h-auto mx-auto"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Glow filter */}
                <filter id="edgeGlow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Outer hexagon edge path (single stroke path for drawing) */}
              <path
                id="outerHex"
                ref={outerHexRef}
                d="M 0 61.96 L 6.09 65.48 L 6.09 90.92 L 28.11 103.65 L 47.1 99.69 M 24.5 37.323 L 24.5 17.1238 L 51.6104 0.865234 L 79.2282 16.2383 L 79.7301 37.323"
                fill="none"
                stroke="#fff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#edgeGlow)"
              />

              {/* Inner hexagon edge path */}
              <path
                id="innerHex"
                ref={innerHexRef}
                d="M 24 47 L 24 80 L 30 76 L 30 54 L 49 65 L 49 87 L 52 96 L 80.5 79.6463 L 80.5 47 L 52 31 L 24 47 M 52 60 L 55 65 L 55.5 87"
                fill="none"
                stroke="#00AEEF"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#edgeGlow)"
              />

              {/* All logo paths (appear after edges are drawn) */}
              <path className="logo-path" d="M29.5801 20.1746V34.3904L24.5 37.323V17.1238L29.5801 20.1746Z" fill="#231F20" />
              <path className="logo-path" d="M51.6104 6.73047L29.9561 19.2334L24.9844 16.248L51.6104 0.865234V6.73047Z" fill="#231F20" />
              <path className="logo-path" d="M79.2282 16.2383L74.15 19.1621L52.61 6.73047V0.865234L79.2282 16.2383Z" fill="#231F20" />
              <path className="logo-path" d="M79.7301 37.323L74.65 34.3904V20.0291L79.7301 17.1043V37.323Z" fill="#231F20" />
              <path className="logo-path" d="M28.11 110.67L28.12 103.65L6.09 90.92L0 94.43L28.11 110.67Z" fill="#231F20" />
              <path className="logo-path" d="M28.11 110.67L47.1 99.69L41.02 96.18L41.03 96.19L28.12 103.65L28.11 110.67Z" fill="#231F20" />
              <path className="logo-path" d="M0 94.43L6.09 90.92V65.48L0 61.96V94.43Z" fill="#231F20" />
              <path className="logo-path" d="M0 61.96L6.09 65.48L19 58.02V51L0 61.96Z" fill="#231F20" />
              <path className="logo-path" d="M49 87L30 76L24 80L52 96L49 87Z" fill="#00AEEF" />
              <path className="logo-path" d="M30 76V54L24 47V80L30 76Z" fill="#00AEEF" />
              <path className="logo-path" d="M30 54L49 65L52 60L33.5 49L24 47L30 54Z" fill="#00AEEF" />
              <path className="logo-path" d="M52 31L24 47L33.5 49L52 38V31Z" fill="#00AEEF" />
              <path className="logo-path" d="M80.5 47L52 31V38L71 49L80.5 47Z" fill="#00AEEF" />
              <path className="logo-path" d="M71 49L52 60L55 65L74 54L80.5 47L71 49Z" fill="#00AEEF" />
              <path className="logo-path" d="M80.5 79.6463V47L74 54L74.5 76L80.5 79.6463Z" fill="#00AEEF" />
              <path className="logo-path" d="M52 96L80.5 79.6463L74.5 76L55.5 87L52 96Z" fill="#00AEEF" />
              <path className="logo-path" d="M49 65V87L52 96L55.5 87L55 65H49Z" fill="#00AEEF" />
              <path className="logo-path" d="M52 60L49 65H55L52 60Z" fill="#00AEEF" />
            </svg>
          </div>
        </div>

        <div ref={solutionSectionRef} className="pointer-events-auto">
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
      </div>
    </section>
  );
}
