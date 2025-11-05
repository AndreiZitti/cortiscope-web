'use client';
import { useState } from 'react';
import SVGPathDrawing from '@/components/animations/SVGPathDrawing';
import ParticleAssembly from '@/components/animations/ParticleAssembly';
import GeometricExplosion from '@/components/animations/GeometricExplosion';
import ElasticBounce from '@/components/animations/ElasticBounce';
import MorphHover from '@/components/animations/MorphHover';
import RotationLoop from '@/components/animations/RotationLoop';
import MorphLoop from '@/components/animations/MorphLoop';
import ParticleDisassemble from '@/components/animations/ParticleDisassemble';
import GlitchEffect from '@/components/animations/GlitchEffect';
import FlipEffect from '@/components/animations/FlipEffect';
import FloatRotation from '@/components/animations/FloatRotation';
import PulseGlow from '@/components/animations/PulseGlow';
import ScopeFocus from '@/components/animations/ScopeFocus';
import GeometricEvolution from '@/components/animations/GeometricEvolution';
import ParticleAssemblyV2 from '@/components/animations/ParticleAssemblyV2';

export default function AnimationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-4 text-center">Cortiscope Logo Animations</h1>
        <p className="text-gray-400 text-center mb-12">Explore different animation styles organized by use case</p>

        {/* MORPHING - FEATURED */}
        {/* <section className="mb-16">
          <h2 className="text-3xl font-bold mb-2 text-pink-400">✨ Morphing (Featured)</h2>
          <p className="text-gray-400 mb-6">Advanced shape transformations and brand-focused animations</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimationCard
              title="The Scope Focus"
              description="Concentric circles morph into hexagons - clarity & precision"
              component={<ScopeFocus />}
            />
            <AnimationCard
              title="Geometric Evolution"
              description="Point → Triangle → Square → Pentagon → Hexagon progression"
              component={<GeometricEvolution />}
            />
            <AnimationCard
              title="Particle Assembly V2"
              description="Geometric particles organize into interlocked hexagons"
              component={<ParticleAssemblyV2 />}
            />
          </div>
        </section> */}

        {/* HERO/FIRST LOAD */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-2 text-blue-400">Hero / First Load</h2>
          <p className="text-gray-400 mb-6">Make a strong first impression</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimationCard
              title="SVG Path Drawing"
              description="Logo draws itself line by line"
              component={<SVGPathDrawing />}
            />
            {/* <AnimationCard
              title="Particle Assembly"
              description="Scattered particles form the logo"
              component={<ParticleAssembly />}
            />
            <AnimationCard
              title="Geometric Explosion"
              description="Pieces fly in and lock into place"
              component={<GeometricExplosion />}
            /> */}
          </div>
        </section>

        {/* HEADER/NAVIGATION */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-2 text-green-400">Header / Navigation</h2>
          <p className="text-gray-400 mb-6">Subtle, non-intrusive interactions</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimationCard
              title="Elastic Bounce"
              description="Playful spring physics on hover"
              component={<ElasticBounce />}
            />
            <AnimationCard
              title="Morph on Hover"
              description="Shape shifts when you hover"
              component={<MorphHover />}
            />
          </div>
        </section>

        {/* LOADING/TRANSITION */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-2 text-purple-400">Loading / Transition</h2>
          <p className="text-gray-400 mb-6">Keep users engaged during waits</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimationCard
              title="3D Rotation Loop"
              description="Continuous spinning motion"
              component={<RotationLoop />}
            />
            <AnimationCard
              title="Morph Loop"
              description="Continuous shape transformation"
              component={<MorphLoop />}
            />
          </div>
        </section>

        {/* EXIT/OUTRO */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-2 text-red-400">Exit / Outro</h2>
          <p className="text-gray-400 mb-6">Memorable farewell animations</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimationCard
              title="Particle Disassemble"
              description="Logo breaks into particles"
              component={<ParticleDisassemble />}
            />
          </div>
        </section>

        {/* INTERACTIVE */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-2 text-yellow-400">Interactive</h2>
          <p className="text-gray-400 mb-6">Reward user interaction</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimationCard
              title="Glitch Effect"
              description="Digital distortion on click"
              component={<GlitchEffect />}
            />
            <AnimationCard
              title="3D Flip"
              description="Card flip reveal on click"
              component={<FlipEffect />}
            />
          </div>
        </section>

        {/* AMBIENT/BACKGROUND */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-2 text-cyan-400">Ambient / Background</h2>
          <p className="text-gray-400 mb-6">Subtle presence without distraction</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimationCard
              title="Slow Float + Rotation"
              description="Gentle drift and spin"
              component={<FloatRotation />}
            />
            <AnimationCard
              title="Pulse & Glow"
              description="Breathing effect with glow"
              component={<PulseGlow />}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function AnimationCard({ title, description, component }: { title: string; description: string; component: React.ReactNode }) {
  const [key, setKey] = useState(0);

  const handleReload = () => {
    setKey(prev => prev + 1);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-semibold">{title}</h3>
        <button
          onClick={handleReload}
          className="text-blue-400 hover:text-blue-300 transition-colors p-2 hover:bg-gray-700 rounded-lg"
          title="Reload animation"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
          </svg>
        </button>
      </div>
      <p className="text-gray-400 text-sm mb-4">{description}</p>
      <div key={key} className="bg-gray-900 rounded-lg p-8 flex items-center justify-center min-h-[200px]">
        {component}
      </div>
    </div>
  );
}
