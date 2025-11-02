'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';

// Register the plugin
gsap.registerPlugin(MorphSVGPlugin);

export default function CubeToLogoMorph() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Convert circle to path
    const convertedPaths = MorphSVGPlugin.convertToPath('#morph-shape');
    const morphShape = convertedPaths[0];

    const topBlack = svgRef.current.querySelector('#top-black') as SVGPathElement;
    const bottomBlack = svgRef.current.querySelector('#bottom-black') as SVGPathElement;

    // Set initial state for black pieces - hidden
    gsap.set([topBlack, bottomBlack], { opacity: 0 });

    // Create animation timeline
    const tl = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 0.5 });

    // Morph the circle to the blue cube
    tl.to(morphShape, {
      duration: 1.5,
      morphSVG: {
        shape: '#target-blue',
        type: 'rotational',
      },
      ease: 'power2.inOut',
    }, 0)
    // Fade in the black pieces during the morph
    .to([topBlack, bottomBlack], {
      duration: 1.0,
      opacity: 1,
      ease: 'power2.inOut',
    }, 0.5);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 81.31 108.37"
      className="w-48 h-64"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Black pieces that fade in - render first (behind) */}
      <path
        id="top-black"
        d="M53.19,0l-28.11,16.24v21.95l6.08-3.51v-14.94l22.03-12.72,22.04,12.72v14.94l6.08,3.51v-21.95L53.19,0Z"
        fill="#231f20"
      />
      <path
        id="bottom-black"
        d="M41.03,93.89l-12.91,7.46-22.03-12.73v-25.44l12.91-7.46v-7.02L0,59.66v32.47l28.11,16.24,18.99-10.98-6.08-3.51Z"
        fill="#231f20"
      />

      {/* Circle that will be converted to path and morphed - render last (on top) */}
      <circle id="morph-shape" cx="40.65" cy="54.18" r="25" fill="#00aeef" />

      {/* Hidden target shape - blue cube only */}
      <path
        id="target-blue"
        d="M75.23,41.69l-22.04-12.73-22.03,12.72-3.04,1.76-3.04,1.75v32.46l22.04,12.73,6.07,3.51,3.05-1.76,25.07-14.47v-32.46l-6.08-3.51ZM53.19,35.98l19,10.97-18.99,10.97-19-10.97,18.99-10.97ZM31.15,74.15v-21.93l19,10.97v21.93l-19-10.97ZM75.23,74.15l-18.99,10.96v-21.92l18.99-10.97v21.93Z"
        fill="#00aeef"
        visibility="hidden"
      />
    </svg>
  );
}
