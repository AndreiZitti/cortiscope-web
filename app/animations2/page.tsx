'use client';
import { useState } from 'react';
import TrustAssembly from '@/components/animations/TrustAssembly';
import DepthReveal from '@/components/animations/DepthReveal';
import HeartbeatIdle from '@/components/animations/HeartbeatIdle';
import TracePath from '@/components/animations/TracePath';
import PrecisionLock from '@/components/animations/PrecisionLock';
import CubeToLogoMorph from '@/components/animations/CubeToLogoMorph';
import ScienceToLogoMorph from '@/components/animations/ScienceToLogoMorph';

export default function Animations2Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-4 text-center">Cortiscope Full Logo Animations</h1>
        <p className="text-gray-400 text-center mb-12">Advanced GSAP animations for the complete logo with cube and text</p>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-2 text-blue-400">Precision & Trust Animations</h2>
          <p className="text-gray-400 mb-6">Animations emphasizing reliability, depth, and precision</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimationCard
              title="Trust Assembly"
              description="Cube builds piece-by-piece with glowing faces and light sweep. Precision, reliability, methodical."
              component={<TrustAssembly />}
            />
            <AnimationCard
              title="Depth Reveal"
              description="Back-to-front sequential fade creating depth perception. Layered intelligence, depth of analysis."
              component={<DepthReveal />}
            />
            <AnimationCard
              title="Heartbeat Idle"
              description="Subtle breathing scale with synchronized glow pulse. Living system, medical tech."
              component={<HeartbeatIdle />}
            />
            <AnimationCard
              title="Trace Path"
              description="Data flowing through structure along edges. Transparent, auditable, connected."
              component={<TracePath />}
            />
            <AnimationCard
              title="Precision Lock"
              description="Faces slide from offset angles with micro-bounce. Accuracy, clinical precision."
              component={<PrecisionLock />}
            />
            <AnimationCard
              title="Cube to Logo Morph"
              description="Simple cube morphs into logo. Transformation, evolution, adaptive intelligence."
              component={<CubeToLogoMorph />}
            />
            <AnimationCard
              title="Science to Logo Journey"
              description="Biology → Physics → AI → Logo. Multi-disciplinary convergence, scientific evolution."
              component={<ScienceToLogoMorph />}
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
      <div key={key} className="bg-gray-900 rounded-lg p-8 flex items-center justify-center min-h-[300px]">
        {component}
      </div>
    </div>
  );
}
