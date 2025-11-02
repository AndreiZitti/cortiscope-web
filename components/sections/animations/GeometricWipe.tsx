"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { PROBLEMS, SOLUTIONS } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

export default function GeometricWipe() {
  const containerRef = useRef<HTMLElement>(null);
  const problemSectionRef = useRef<HTMLDivElement>(null);
  const solutionSectionRef = useRef<HTMLDivElement>(null);
  const logoSectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!containerRef.current || !problemSectionRef.current || !solutionSectionRef.current || !logoSectionRef.current || !svgRef.current) return;

    const container = containerRef.current;
    const problemSection = problemSectionRef.current;
    const solutionSection = solutionSectionRef.current;
    const logoSection = logoSectionRef.current;
    const svg = svgRef.current;

    const problemCards = problemSection.querySelectorAll('.problem-card');
    const solutionCards = solutionSection.querySelectorAll('.solution-card');
    const logoPaths = svg.querySelectorAll('path');

    let ctx: gsap.Context;

    // Small delay to let React finish initial render
    const timer = setTimeout(() => {
      // Set initial states
      gsap.set(solutionSection, {
        clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)',
      });
      gsap.set(logoSection, { opacity: 0 });
      gsap.set(logoPaths, { drawSVG: '0% 0%' });
      gsap.set(solutionCards, { opacity: 0, x: 100, y: 100 });

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

    // Timeline 1: Problems In (0% - 15%)
    tl.fromTo(
      problemCards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power2.out',
      },
      0
    );

    // Timeline 2: Hexagonal Wipe (15% - 60%)
    // Hexagonal wipe expanding from center
    tl.to(
      solutionSection,
      {
        clipPath: 'polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)',
        duration: 1.8,
        ease: 'power2.inOut',
      },
      1.5
    )
      // Fade out problems simultaneously
      .to(
        problemCards,
        {
          opacity: 0,
          scale: 0.95,
          duration: 1,
          stagger: 0.1,
        },
        1.8
      )
      // "The Solution:" text appears
      .to(
        logoSection,
        {
          opacity: 1,
          duration: 0.5,
        },
        2.2
      );

    // Timeline 3: Logo Draw (60% - 80%)
    const outerPaths = Array.from(logoPaths).filter(
      (p) => (p as SVGPathElement).getAttribute('fill') === '#fff'
    );
    const innerPaths = Array.from(logoPaths).filter(
      (p) => (p as SVGPathElement).getAttribute('fill') === '#00AEEF'
    );

    // Draw outer hexagon paths
    outerPaths.forEach((path, index) => {
      tl.to(
        path,
        {
          drawSVG: '0% 100%',
          duration: 0.3,
          ease: 'power1.inOut',
        },
        3 + index * 0.1
      );
    });

    // Draw inner cube paths
    innerPaths.forEach((path, index) => {
      tl.to(
        path,
        {
          drawSVG: '0% 100%',
          duration: 0.3,
          ease: 'power1.inOut',
        },
        3.8 + index * 0.08
      );
    });

    // Timeline 4: Solutions Slide In (80% - 100%)
    // Calculate hexagon vertex positions (angles: 0°, 240°, 300° for top, bottom-left, bottom-right)
    const angles = [-90, 150, 30]; // degrees for top, bottom-left, bottom-right
    const distance = 200; // pixels from center

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
          ease: 'back.out(1.2)',
        },
        4.5 + index * 0.15
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
    <section ref={containerRef} className="relative min-h-screen bg-white overflow-hidden">
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

      {/* Solution Section (with hexagonal clip) */}
      <div
        ref={solutionSectionRef}
        className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary to-blue-600 z-20"
        style={{
          clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)',
        }}
      >
        {/* Logo and Text */}
        <div ref={logoSectionRef} className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            The Solution: NosoScan
          </h2>
          <div className="flex justify-center">
            <svg
              ref={svgRef}
              viewBox="0 0 81 111"
              className="w-32 h-auto"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer black hexagon paths */}
              <path d="M29.5801 20.1746V34.3904L24.5 37.323V17.1238L29.5801 20.1746Z" fill="#231F20" stroke="#231F20" strokeWidth="2" />
              <path d="M51.6104 6.73047L29.9561 19.2334L24.9844 16.248L51.6104 0.865234V6.73047Z" fill="#231F20" stroke="#231F20" strokeWidth="2" />
              <path d="M79.2282 16.2383L74.15 19.1621L52.61 6.73047V0.865234L79.2282 16.2383Z" fill="#231F20" stroke="#231F20" strokeWidth="2" />
              <path d="M79.7301 37.323L74.65 34.3904V20.0291L79.7301 17.1043V37.323Z" fill="#231F20" stroke="#231F20" strokeWidth="2" />
              <path d="M28.11 110.67L28.12 103.65L6.09 90.92L0 94.43L28.11 110.67Z" fill="#231F20" stroke="#231F20" strokeWidth="2" />
              <path d="M28.11 110.67L47.1 99.69L41.02 96.18L41.03 96.19L28.12 103.65L28.11 110.67Z" fill="#231F20" stroke="#231F20" strokeWidth="2" />
              <path d="M0 94.43L6.09 90.92V65.48L0 61.96V94.43Z" fill="#231F20" stroke="#231F20" strokeWidth="2" />
              <path d="M0 61.96L6.09 65.48L19 58.02V51L0 61.96Z" fill="#231F20" stroke="#231F20" strokeWidth="2" />
              {/* Inner blue cube paths */}
              <path d="M49 87L30 76L24 80L52 96L49 87Z" fill="#00AEEF" stroke="#00AEEF" strokeWidth="2" />
              <path d="M30 76V54L24 47V80L30 76Z" fill="#00AEEF" stroke="#00AEEF" strokeWidth="2" />
              <path d="M30 54L49 65L52 60L33.5 49L24 47L30 54Z" fill="#00AEEF" stroke="#00AEEF" strokeWidth="2" />
              <path d="M52 31L24 47L33.5 49L52 38V31Z" fill="#00AEEF" stroke="#00AEEF" strokeWidth="2" />
              <path d="M80.5 47L52 31V38L71 49L80.5 47Z" fill="#00AEEF" stroke="#00AEEF" strokeWidth="2" />
              <path d="M71 49L52 60L55 65L74 54L80.5 47L71 49Z" fill="#00AEEF" stroke="#00AEEF" strokeWidth="2" />
              <path d="M80.5 79.6463V47L74 54L74.5 76L80.5 79.6463Z" fill="#00AEEF" stroke="#00AEEF" strokeWidth="2" />
              <path d="M52 96L80.5 79.6463L74.5 76L55.5 87L52 96Z" fill="#00AEEF" stroke="#00AEEF" strokeWidth="2" />
              <path d="M49 65V87L52 96L55.5 87L55 65H49Z" fill="#00AEEF" stroke="#00AEEF" strokeWidth="2" />
              <path d="M52 60L49 65H55L52 60Z" fill="#00AEEF" stroke="#00AEEF" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* Solution Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          {SOLUTIONS.map((solution, index) => (
            <div
              key={index}
              className="solution-card p-8 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
            >
              <h3 className="text-2xl font-bold text-white mb-4">
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
