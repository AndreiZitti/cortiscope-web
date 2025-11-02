'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function TracePath() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const allPaths = svg.querySelectorAll('path:not(#scanLine):not(#scanGlow):not([id^="trace"])');

    const cubePaths = Array.from(allPaths).filter(p =>
      p.getAttribute('fill') === '#fff' || p.getAttribute('fill') === '#00AEEF'
    );

    const scanLine = svg.querySelector('#scanLine');
    const scanGlow = svg.querySelector('#scanGlow');

    // Set initial state
    gsap.set(cubePaths, { opacity: 0 });
    gsap.set([scanLine, scanGlow], { opacity: 0 });

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });

    // Phase 1: Medical scan from left to right reveals the logo
    tl.set([scanLine, scanGlow], { opacity: 1, x: -100 })
      .to([scanLine, scanGlow], {
        x: 100,
        duration: 2,
        ease: 'power1.inOut',
      }, 0)
      // Reveal logo as scan passes over
      .to(cubePaths, {
        opacity: 1,
        duration: 2,
        ease: 'power1.inOut',
      }, 0)
      // Fade out scan line
      .to([scanLine, scanGlow], {
        opacity: 0,
        duration: 0.3,
      }, 2);

    // Phase 2: Medical trace lights moving along edges (left to right pattern)
    const edgeTraces = [
      { id: 'trace1', delay: 2.5 },
      { id: 'trace2', delay: 2.7 },
      { id: 'trace3', delay: 3.2 },
      { id: 'trace4', delay: 3.4 },
      { id: 'trace5', delay: 3.9 },
      { id: 'trace6', delay: 4.1 },
    ];

    edgeTraces.forEach(({ id, delay }) => {
      const pathElem = svg.querySelector(`#${id}`) as SVGPathElement;
      if (!pathElem) return;

      const length = pathElem.getTotalLength();

      gsap.set(pathElem, {
        strokeDasharray: `${length * 0.15} ${length}`,
        strokeDashoffset: 0,
      });

      tl.fromTo(pathElem,
        {
          strokeDashoffset: 0,
          opacity: 1,
        },
        {
          strokeDashoffset: -length,
          duration: 1.5,
          ease: 'none',
        },
        delay
      );
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="-20 -10 121 151"
      className="w-full h-auto max-w-[240px]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Medical scan line gradient */}
        <linearGradient id="scanGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(0, 255, 200, 0)" />
          <stop offset="50%" stopColor="rgba(0, 255, 200, 0.8)" />
          <stop offset="100%" stopColor="rgba(0, 255, 200, 0)" />
        </linearGradient>

        {/* Glow filter for traces */}
        <filter id="medicalGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Medical scan line (vertical sweeping left to right) */}
      <g id="scanGroup">
        <rect id="scanGlow" x="-5" y="-10" width="10" height="151" fill="url(#scanGradient)" opacity="0.5" filter="url(#medicalGlow)" />
        <rect id="scanLine" x="-1" y="-10" width="2" height="151" fill="rgba(0, 255, 200, 0.9)" />
      </g>

      {/* Edge trace paths (medical cyan glows following structure left-to-right) */}
      <g id="traces" filter="url(#medicalGlow)">
        {/* Bottom left to middle left */}
        <path id="trace1" d="M 0 61.96 L 6.09 65.48 L 19 58.02 L 24 47"
          stroke="rgba(0, 255, 200, 0.9)" strokeWidth="3" fill="none" strokeLinecap="round" />

        {/* Left side vertical */}
        <path id="trace2" d="M 0 61.96 L 0 94.43 L 6.09 90.92"
          stroke="rgba(0, 255, 200, 0.9)" strokeWidth="3" fill="none" strokeLinecap="round" />

        {/* Middle section */}
        <path id="trace3" d="M 24 47 L 30 54 L 30 76 L 24 80"
          stroke="rgba(0, 255, 200, 0.9)" strokeWidth="3" fill="none" strokeLinecap="round" />

        {/* Center to top */}
        <path id="trace4" d="M 33.5 49 L 52 38 L 52 31"
          stroke="rgba(0, 255, 200, 0.9)" strokeWidth="3" fill="none" strokeLinecap="round" />

        {/* Right side middle */}
        <path id="trace5" d="M 71 49 L 74 54 L 74.5 76 L 80.5 79.6463"
          stroke="rgba(0, 255, 200, 0.9)" strokeWidth="3" fill="none" strokeLinecap="round" />

        {/* Top right */}
        <path id="trace6" d="M 52 31 L 52.61 6.73047 L 79.2282 16.2383 L 80.5 47"
          stroke="rgba(0, 255, 200, 0.9)" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>

      {/* Logo structure */}
      <path d="M29.5801 20.1746V34.3904L24.5 37.323V17.1238L29.5801 20.1746Z" fill="#fff" />
      <path d="M51.6104 6.73047L29.9561 19.2334L24.9844 16.248L51.6104 0.865234V6.73047Z" fill="#fff" />
      <path d="M79.2282 16.2383L74.15 19.1621L52.61 6.73047V0.865234L79.2282 16.2383Z" fill="#fff" />
      <path d="M79.7301 37.323L74.65 34.3904V20.0291L79.7301 17.1043V37.323Z" fill="#fff" />
      <path d="M28.11 110.67L28.12 103.65L6.09 90.92L0 94.43L28.11 110.67Z" fill="#fff"/>
      <path d="M28.11 110.67L47.1 99.69L41.02 96.18L41.03 96.19L28.12 103.65L28.11 110.67Z" fill="#fff"/>
      <path d="M0 94.43L6.09 90.92V65.48L0 61.96V94.43Z" fill="#fff"/>
      <path d="M0 61.96L6.09 65.48L19 58.02V51L0 61.96Z" fill="#fff"/>
      <path d="M49 87L30 76L24 80L52 96L49 87Z" fill="#00AEEF"/>
      <path d="M30 76V54L24 47V80L30 76Z" fill="#00AEEF"/>
      <path d="M30 54L49 65L52 60L33.5 49L24 47L30 54Z" fill="#00AEEF"/>
      <path d="M52 31L24 47L33.5 49L52 38V31Z" fill="#00AEEF"/>
      <path d="M80.5 47L52 31V38L71 49L80.5 47Z" fill="#00AEEF"/>
      <path d="M71 49L52 60L55 65L74 54L80.5 47L71 49Z" fill="#00AEEF"/>
      <path d="M80.5 79.6463V47L74 54L74.5 76L80.5 79.6463Z" fill="#00AEEF"/>
      <path d="M52 96L80.5 79.6463L74.5 76L55.5 87L52 96Z" fill="#00AEEF"/>
      <path d="M49 65V87L52 96L55.5 87L55 65H49Z" fill="#00AEEF"/>
      <path d="M52 60L49 65H55L52 60Z" fill="#00AEEF"/>
      <path d="M49 87V65M49 87L30 76M49 87L52 96M49 65L30 54M49 65L52 60M49 65H55M30 54V76M30 54L24 47M30 76L24 80M52 96L24 80M52 96L80.5 79.6463M52 96L55.5 87M24 80V47M24 47L52 31M24 47L33.5 49M52 31L80.5 47M52 31V38M80.5 47V79.6463M80.5 47L71 49M80.5 47L74 54M80.5 79.6463L74.5 76M33.5 49L52 38M33.5 49L52 60M52 38L71 49M71 49L52 60M52 60L55 65M55 65L55.5 87M55 65L74 54M55.5 87L74.5 76M74.5 76L74 54" stroke="black" fill="none" opacity="0"/>
    </svg>
  );
}
