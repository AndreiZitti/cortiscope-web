'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';

// Register the plugin
gsap.registerPlugin(MorphSVGPlugin);

export default function ScienceToLogoMorph() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const biology = svgRef.current.querySelector('#biology-svg');
    const physics = svgRef.current.querySelector('#physics-svg');
    const ai = svgRef.current.querySelector('#ai-svg');
    const logo = svgRef.current.querySelector('#logo-svg');

    if (!biology || !physics || !ai || !logo) return;

    // Get the first visible path from each SVG as our morph targets
    const biologyPath = biology.querySelector('path');
    const physicsPath = physics.querySelector('path');
    const aiPath = ai.querySelector('path');
    const logoPath = logo.querySelector('path');

    if (!biologyPath || !physicsPath || !aiPath || !logoPath) return;

    // Create a morphing path element
    const morphShape = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    morphShape.setAttribute('fill', '#00aeef');
    morphShape.setAttribute('d', biologyPath.getAttribute('d') || '');
    svgRef.current.appendChild(morphShape);

    // Hide the source SVGs
    gsap.set([biology, physics, ai, logo], { opacity: 0 });

    // Create animation timeline
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    // Biology → Physics
    tl.to(morphShape, {
      duration: 1.5,
      morphSVG: physicsPath,
      ease: 'power2.inOut',
    })
    // Hold on Physics
    .to({}, { duration: 0.5 })
    // Physics → AI
    .to(morphShape, {
      duration: 1.5,
      morphSVG: aiPath,
      ease: 'power2.inOut',
    })
    // Hold on AI
    .to({}, { duration: 0.5 })
    // AI → Logo
    .to(morphShape, {
      duration: 1.5,
      morphSVG: logoPath,
      ease: 'power2.inOut',
    })
    // Hold on Logo
    .to({}, { duration: 1 })
    // Logo → Biology (back to start)
    .to(morphShape, {
      duration: 1.5,
      morphSVG: biologyPath,
      ease: 'power2.inOut',
    });

    return () => {
      tl.kill();
      morphShape.remove();
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 100 100"
      className="w-64 h-64"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Biology - DNA Double Helix */}
      <g id="biology-svg">
        <path fill="#00aeef" d="M53.9,68.6c-0.4,0-0.8-0.2-0.9-0.6c-0.2-0.5,0-1.1,0.5-1.3c9.4-3.9,15.2-8.2,15.2-17.1c0-0.6,0.4-1,1-1s1,0.4,1,1c0,11.1-8.5,15.6-16.5,19C54.2,68.5,54,68.6,53.9,68.6z"/>
        <path fill="#00aeef" d="M29.6,90.6c-0.6,0-1-0.4-1-1c0-10.9,7.6-15.7,15.9-19.3c0.5-0.2,1.1,0,1.3,0.5c0.2,0.5,0,1.1-0.5,1.3c-8.8,3.8-14.7,8.2-14.7,17.5C30.6,90.2,30.2,90.6,29.6,90.6z"/>
        <path fill="#00aeef" d="M45.5,28c-0.1,0-0.3,0-0.4-0.1c-8-3.3-16.5-7.8-16.5-19c0-0.6,0.4-1,1-1s1,0.4,1,1c0,8.9,5.8,13.2,15.2,17.1c0.5,0.2,0.7,0.8,0.5,1.3C46.2,27.8,45.9,28,45.5,28z"/>
        <path fill="#00aeef" d="M69.7,50c-0.6,0-1-0.4-1-1c0-9.2-5.8-13.6-14.4-17.4c-0.5-0.2-0.7-0.8-0.5-1.3c0.2-0.5,0.8-0.7,1.3-0.5c8.1,3.5,15.6,8.3,15.6,19.2C70.7,49.6,70.3,50,69.7,50z"/>
        <path fill="#00aeef" d="M29.6,50c-0.6,0-1-0.4-1-1c0-12.5,10.4-16.6,20.4-20.6c10.1-4,19.7-7.8,19.7-19.5c0-0.6,0.4-1,1-1s1,0.4,1,1c0,13-10.6,17.3-20.9,21.4C40,34.2,30.6,37.9,30.6,49C30.6,49.6,30.2,50,29.6,50z"/>
        <path fill="#00aeef" d="M69.7,90.6c-0.6,0-1-0.4-1-1c0-11.1-9.3-14.8-19.2-18.7c-10.3-4.1-20.9-8.3-20.9-21.4c0-0.6,0.4-1,1-1s1,0.4,1,1c0,11.7,9.5,15.5,19.7,19.5c10,4,20.4,8.1,20.4,20.6C70.7,90.2,70.3,90.6,69.7,90.6z"/>
      </g>

      {/* Physics - Atom */}
      <g id="physics-svg">
        <path fill="#00aeef" d="M50,56.7c3.1,0,5.6-2.5,5.6-5.6s-2.5-5.6-5.6-5.6s-5.6,2.5-5.6,5.6S46.9,56.7,50,56.7z M50,47.6c2,0,3.6,1.6,3.6,3.6S52,54.7,50,54.7s-3.6-1.6-3.6-3.6S48,47.6,50,47.6z"/>
        <path fill="#00aeef" d="M27.4,50.9c-1.5,1.4-2.9,2.8-4.1,4.2C23,55,22.7,55,22.4,55c-1.6,0-2.9,1.3-2.9,2.9c0,0.5,0.1,1,0.4,1.4c-3.7,5.2-5,9.8-3.2,12.7c1.3,2.1,4,3,7.6,3c3.8,0,8.6-1.1,14-3.1C40.7,83.1,45,90.4,50,90.4c5,0,9.2-7.2,11.6-18.3c5.2,1.9,9.9,2.9,13.6,2.9c3.6,0,6.3-1,7.6-3c1.9-2.9,0.6-7.4-3-12.6c0.3-0.5,0.5-1,0.5-1.6c0-1.6-1.3-2.9-2.9-2.9c-0.4,0-0.7,0.1-1,0.2c-1.3-1.4-2.6-2.8-4.2-4.3c9.1-8.5,13.5-16.7,10.7-21.1c-2.1-3.2-7.5-3.9-15.4-2c-1.9,0.5-3.9,1.1-6,1.9C59.1,18.9,54.9,11.9,50,11.9c-2.8,0-5.3,2.3-7.5,6.2c-0.1,0-0.2,0-0.3,0c-1.6,0-2.9,1.3-2.9,2.9c0,0.9,0.4,1.7,1,2.2c-0.7,2-1.3,4.2-1.8,6.6c-10.7-4-19.1-4.3-21.8-0.1C13.8,34.2,18.3,42.4,27.4,50.9z"/>
      </g>

      {/* AI - Neural Network */}
      <g id="ai-svg">
        <path fill="#00aeef" d="M92.3,46.6c-0.1,0-0.2,0-0.3,0l-3.7-13.6c1.7-0.9,2.9-2.6,2.9-4.6c0-2.9-2.3-5.2-5.2-5.2c-1.4,0-2.8,0.6-3.7,1.6l-10.7-6.9c0.2-0.6,0.4-1.2,0.4-1.9c0-2.9-2.3-5.2-5.2-5.2c-2.3,0-4.3,1.5-4.9,3.6l-13.9-1.4c-0.3-2.6-2.5-4.7-5.1-4.7c-2.9,0-5.2,2.3-5.2,5.2c0,0.2,0,0.4,0,0.7L22.9,19.2c-0.9-1.5-2.6-2.6-4.5-2.6c-2.9,0-5.2,2.3-5.2,5.2c0,1.5,0.7,2.9,1.7,3.9l-5.7,9.9c-0.5-0.2-1.1-0.3-1.6-0.3C4.8,35.3,2.5,37.7,2.5,40.5c0,2.9,2.3,5.2,5.2,5.2c0.4,0,0.7,0,1,0l4.3,10.1c-1.4,0.9-2.2,2.5-2.2,4.3c0,2.9,2.3,5.2,5.2,5.2c1.6,0,3.1-0.8,4.1-2l7.4,3.7c-0.1,0.4-0.2,0.9-0.2,1.3c0,2.9,2.3,5.2,5.2,5.2s5.2-2.3,5.2-5.2c0,0,0-0.1,0-0.1l8.8-1.9c0.8,1.8,2.6,3.1,4.7,3.1c0.7,0,1.4-0.2,2.1-0.4l9.9,14.1c-0.9,0.9-1.4,2.2-1.4,3.6c0,2.9,2.3,5.2,5.2,5.2s5.2-2.3,5.2-5.2c0-1.8-0.9-3.4-2.3-4.3l4.4-10.7c0.3,0.1,0.6,0.1,1,0.1c2.9,0,5.2-2.3,5.2-5.2c0-0.9-0.2-1.8-0.6-2.5l9.5-8.1c0.9,0.7,2,1.1,3.2,1.1c2.9,0,5.2-2.3,5.2-5.2C97.5,48.9,95.2,46.6,92.3,46.6z"/>
      </g>

      {/* Logo - Cortiscope logomark */}
      <g id="logo-svg">
        <path fill="#00aeef" d="M75.23,41.69l-22.04-12.73-22.03,12.72-3.04,1.76-3.04,1.75v32.46l22.04,12.73,6.07,3.51,3.05-1.76,25.07-14.47v-32.46l-6.08-3.51ZM53.19,35.98l19,10.97-18.99,10.97-19-10.97,18.99-10.97ZM31.15,74.15v-21.93l19,10.97v21.93l-19-10.97ZM75.23,74.15l-18.99,10.96v-21.92l18.99-10.97v21.93Z"/>
      </g>
    </svg>
  );
}
