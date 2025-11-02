'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';

// 3D Tumor Component
function TumorModel({ exploded = false }: { exploded?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!groupRef.current) return;

    if (exploded) {
      gsap.to(groupRef.current.children[0].position, {
        y: 1,
        duration: 1,
        ease: 'power2.out'
      });
      gsap.to(groupRef.current.children[1].position, {
        y: 0,
        duration: 1,
        ease: 'power2.out'
      });
      gsap.to(groupRef.current.children[2].position, {
        y: -1,
        duration: 1,
        ease: 'power2.out'
      });
    } else {
      gsap.to(groupRef.current.children[0].position, {
        y: 0,
        duration: 1,
        ease: 'power2.out'
      });
      gsap.to(groupRef.current.children[1].position, {
        y: 0,
        duration: 1,
        ease: 'power2.out'
      });
      gsap.to(groupRef.current.children[2].position, {
        y: 0,
        duration: 1,
        ease: 'power2.out'
      });
    }
  }, [exploded]);

  useEffect(() => {
    if (!groupRef.current) return;

    const rotation = hovered ? Math.PI * 2 : 0;
    gsap.to(groupRef.current.rotation, {
      y: rotation,
      duration: 2,
      ease: 'power2.out'
    });
  }, [hovered]);

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Necrotic core (red) */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color="#ff0000"
          transparent
          opacity={0.8}
          roughness={0.3}
        />
      </mesh>

      {/* Active tumor (yellow/orange) */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial
          color="#ffaa00"
          transparent
          opacity={0.6}
          roughness={0.4}
        />
      </mesh>

      {/* Edema (blue) */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.0, 32, 32]} />
        <meshStandardMaterial
          color="#00aaff"
          transparent
          opacity={0.3}
          roughness={0.5}
        />
      </mesh>
    </group>
  );
}

// Uncertainty heatmap overlay
function UncertaintyOverlay({ visible = false }: { visible?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (!meshRef.current) return;

    gsap.to(meshRef.current.material, {
      opacity: visible ? 0.5 : 0,
      duration: 0.8,
      ease: 'power2.inOut'
    });
  }, [visible]);

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[1.05, 32, 32]} />
      <meshStandardMaterial
        color="#00ff00"
        transparent
        opacity={0}
        wireframe
      />
    </mesh>
  );
}

export default function FeaturesShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [show3D, setShow3D] = useState(false);
  const [showUncertainty, setShowUncertainty] = useState(false);
  const [showExploded, setShowExploded] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);

  const [volume, setVolume] = useState(0);
  const [diameter, setDiameter] = useState(0);
  const [growthRate, setGrowthRate] = useState(0);

  // Trigger animations on mount
  useEffect(() => {
    const tl = gsap.timeline();

    tl.to({}, {
      duration: 0.5,
      onComplete: () => setShow3D(true)
    });

    tl.to({}, {
      duration: 1.5,
      onComplete: () => setShowUncertainty(true)
    });

    tl.to({}, {
      duration: 1,
      onComplete: () => setShowExploded(true)
    });

    tl.to({}, {
      duration: 1,
      onComplete: () => {
        setShowMetrics(true);
        // Animate metrics count-up
        gsap.to({ val: 0 }, {
          val: 45.2,
          duration: 1,
          onUpdate: function() {
            setVolume(parseFloat(this.targets()[0].val.toFixed(1)));
          }
        });
        gsap.to({ val: 0 }, {
          val: 4.1,
          duration: 1,
          onUpdate: function() {
            setDiameter(parseFloat(this.targets()[0].val.toFixed(1)));
          }
        });
        gsap.to({ val: 0 }, {
          val: 2.3,
          duration: 1,
          onUpdate: function() {
            setGrowthRate(parseFloat(this.targets()[0].val.toFixed(1)));
          }
        });
      }
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen bg-black flex items-center justify-center py-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left: Text Content */}
          <div className="text-white space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">
              What You Get
            </h2>
            <p className="text-lg text-gray-300">
              Complete diagnostic tools in one platform
            </p>

            <div className="space-y-4 mt-8">
              <div className={`transition-all duration-500 ${show3D ? 'opacity-100' : 'opacity-30'}`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center">
                    <span className="text-blue-400 text-xs">3D</span>
                  </div>
                  <h3 className="font-semibold">3D Tumor Reconstruction</h3>
                </div>
                <p className="text-sm text-gray-400 ml-11">
                  Full volumetric visualization with interactive controls
                </p>
              </div>

              <div className={`transition-all duration-500 ${showUncertainty ? 'opacity-100' : 'opacity-30'}`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded bg-green-500/20 flex items-center justify-center">
                    <span className="text-green-400 text-xs">📊</span>
                  </div>
                  <h3 className="font-semibold">Confidence Visualization</h3>
                </div>
                <p className="text-sm text-gray-400 ml-11">
                  See prediction certainty at every voxel
                </p>
              </div>

              <div className={`transition-all duration-500 ${showExploded ? 'opacity-100' : 'opacity-30'}`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded bg-purple-500/20 flex items-center justify-center">
                    <span className="text-purple-400 text-xs">🔬</span>
                  </div>
                  <h3 className="font-semibold">Tissue Classification</h3>
                </div>
                <p className="text-sm text-gray-400 ml-11">
                  Necrotic core, active tumor, and edema regions
                </p>
              </div>

              <div className={`transition-all duration-500 ${showMetrics ? 'opacity-100' : 'opacity-30'}`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded bg-orange-500/20 flex items-center justify-center">
                    <span className="text-orange-400 text-xs">#</span>
                  </div>
                  <h3 className="font-semibold">Quantitative Metrics</h3>
                </div>
                <div className="grid grid-cols-3 gap-4 ml-11 mt-3">
                  <div className="bg-gray-800/50 rounded p-3">
                    <div className="text-2xl font-bold text-blue-400">{volume}</div>
                    <div className="text-xs text-gray-400">cm³</div>
                  </div>
                  <div className="bg-gray-800/50 rounded p-3">
                    <div className="text-2xl font-bold text-green-400">{diameter}</div>
                    <div className="text-xs text-gray-400">cm</div>
                  </div>
                  <div className="bg-gray-800/50 rounded p-3">
                    <div className="text-2xl font-bold text-orange-400">+{growthRate}</div>
                    <div className="text-xs text-gray-400">%/mo</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: 3D Visualization */}
          <div className="relative">
            <div className="relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl aspect-square">
              {show3D ? (
                <Canvas>
                  <PerspectiveCamera makeDefault position={[0, 0, 4]} />
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} intensity={1} />
                  <pointLight position={[-10, -10, -10]} intensity={0.5} />

                  <TumorModel exploded={showExploded} />
                  <UncertaintyOverlay visible={showUncertainty} />

                  <OrbitControls
                    enableZoom={true}
                    enablePan={false}
                    autoRotate={true}
                    autoRotateSpeed={2}
                  />
                </Canvas>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-white text-center">
                    <div className="animate-pulse text-4xl mb-4">🧊</div>
                    <div className="text-sm">Loading 3D visualization...</div>
                  </div>
                </div>
              )}

              {/* Feature labels overlay */}
              {showExploded && (
                <div className="absolute top-4 right-4 space-y-2 text-xs">
                  <div className="bg-black/70 px-3 py-1 rounded flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span className="text-white">Necrotic Core</span>
                  </div>
                  <div className="bg-black/70 px-3 py-1 rounded flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <span className="text-white">Active Tumor</span>
                  </div>
                  <div className="bg-black/70 px-3 py-1 rounded flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-white">Edema</span>
                  </div>
                </div>
              )}
            </div>
            <div className="text-center mt-4 text-sm text-gray-400">
              Drag to rotate • Scroll to zoom
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
