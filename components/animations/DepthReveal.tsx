'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function DepthReveal() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const allPaths = svg.querySelectorAll('path');

    // 1. Center triangle (smallest top face)
    const centerTriangle = Array.from(allPaths).find(p =>
      p.getAttribute('d') === 'M52 60L49 65H55L52 60Z'
    );

    // 2. Three connecting faces
    const connecting = Array.from(allPaths).filter(p => {
      const d = p.getAttribute('d');
      return d === 'M49 65V87L52 96L55.5 87L55 65H49Z' ||
        d === 'M71 49L52 60L55 65L74 54L80.5 47L71 49Z' ||
        d === 'M30 54L49 65L52 60L33.5 49L24 47L30 54Z';
    });

    // 3. Outer cube edges (remaining 6 blue faces)
    const outerCube = Array.from(allPaths).filter(p => {
      const d = p.getAttribute('d');
      return p.getAttribute('fill') === '#00AEEF' &&
        d !== 'M52 60L49 65H55L52 60Z' &&
        d !== 'M49 65V87L52 96L55.5 87L55 65H49Z' &&
        d !== 'M71 49L52 60L55 65L74 54L80.5 47L71 49Z' &&
        d !== 'M30 54L49 65L52 60L33.5 49L24 47L30 54Z';
    });

    // 4. Black hexagons
    const blackHexagons = Array.from(allPaths).filter(p =>
      p.getAttribute('fill') === '#fff' || p.getAttribute('fill') === '#231F20'
    );

    // Set all invisible
    gsap.set([centerTriangle, ...connecting, ...outerCube, ...blackHexagons], {
      opacity: 0,
      scale: 0.8,
      transformOrigin: '50% 50%'
    });

    const tl = gsap.timeline();

    // 1. Center triangle
    tl.to(centerTriangle, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: 'back.out(1.7)'
    });

    // 2. Connecting faces
    tl.to(connecting, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: 'back.out(1.4)'
    }, '+=0.2');

    // 3. Outer cube edges
    tl.to(outerCube, {
      opacity: 1,
      scale: 1,
      duration: 0.7,
      stagger: 0.08,
      ease: 'power2.out'
    }, '+=0.2');

    // 4. Black hexagons
    tl.to(blackHexagons, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      stagger: 0.06,
      ease: 'power2.out'
    }, '+=0.2');

    return () => tl.kill();
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 81 111"
      className="w-full h-auto max-w-[200px]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M29.5801 20.1746V34.3904L24.5 37.323V17.1238L29.5801 20.1746Z" fill="#fff" />
      <path d="M51.6104 6.73047L29.9561 19.2334L24.9844 16.248L51.6104 0.865234V6.73047Z" fill="#fff" />
      <path d="M79.2282 16.2383L74.15 19.1621L52.61 6.73047V0.865234L79.2282 16.2383Z" fill="#fff" />
      <path d="M79.7301 37.323L74.65 34.3904V20.0291L79.7301 17.1043V37.323Z" fill="#fff" />
      <path d="M28.11 110.67L28.12 103.65L6.09 90.92L0 94.43L28.11 110.67Z" fill="#fff" />
      <path d="M28.11 110.67L47.1 99.69L41.02 96.18L41.03 96.19L28.12 103.65L28.11 110.67Z" fill="#fff" />
      <path d="M0 94.43L6.09 90.92V65.48L0 61.96V94.43Z" fill="#fff" />
      <path d="M0 61.96L6.09 65.48L19 58.02V51L0 61.96Z" fill="#fff" />
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
    </svg>
  );
}