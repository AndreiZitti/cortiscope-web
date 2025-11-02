'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AnimatedLogo() {
  const logoRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!logoRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const logoPieces = logoRef.current!.querySelectorAll('path');

      // Logo container entrance
      gsap.from(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
        },
        y: -50,
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
      });

      // Logo pieces assemble with stagger
      gsap.from(logoPieces, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 55%',
        },
        scale: 0,
        rotation: 45,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: 'back.out(1.7)',
        transformOrigin: 'center center'
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-[200px] h-[280px] flex items-center justify-center">
      <svg
        ref={logoRef}
        width="200"
        height="280"
        viewBox="0 0 81 111"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <path d="M29.5801 20.1746V34.3904L24.5 37.323V17.1238L29.5801 20.1746Z" fill="#231F20" stroke="black"/>
        <path d="M51.6104 6.73047L29.9561 19.2334L24.9844 16.248L51.6104 0.865234V6.73047Z" fill="#231F20" stroke="black"/>
        <path d="M79.2282 16.2383L74.15 19.1621L52.61 6.73047V0.865234L79.2282 16.2383Z" fill="#231F20" stroke="black"/>
        <path d="M79.7301 37.323L74.65 34.3904V20.0291L79.7301 17.1043V37.323Z" fill="#231F20" stroke="black"/>
        <path d="M28.11 110.67L28.12 103.65L6.09 90.92L0 94.43L28.11 110.67Z" fill="#231F20"/>
        <path d="M28.11 110.67L47.1 99.69L41.02 96.18L41.03 96.19L28.12 103.65L28.11 110.67Z" fill="#231F20"/>
        <path d="M0 94.43L6.09 90.92V65.48L0 61.96V94.43Z" fill="#231F20"/>
        <path d="M0 61.96L6.09 65.48L19 58.02V51L0 61.96Z" fill="#231F20"/>
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
        <path d="M49 87V65M49 87L30 76M49 87L52 96M49 65L30 54M49 65L52 60M49 65H55M30 54V76M30 54L24 47M30 76L24 80M52 96L24 80M52 96L80.5 79.6463M52 96L55.5 87M24 80V47M24 47L52 31M24 47L33.5 49M52 31L80.5 47M52 31V38M80.5 47V79.6463M80.5 47L71 49M80.5 47L74 54M80.5 79.6463L74.5 76M33.5 49L52 38M33.5 49L52 60M52 38L71 49M71 49L52 60M52 60L55 65M55 65L55.5 87M55 65L74 54M55.5 87L74.5 76M74.5 76L74 54" stroke="black"/>
      </svg>
    </div>
  );
}
