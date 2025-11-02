"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BUILT_FOR_TRUST } from "@/lib/constants";

export default function TransparencyViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [highlightedPath, setHighlightedPath] = useState<number[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Nodes representing decision points
    const nodes = [
      { x: 0.15, y: 0.3, label: "Input", active: false, delay: 0 },
      { x: 0.35, y: 0.2, label: "Feature\nExtraction", active: false, delay: 500 },
      { x: 0.35, y: 0.5, label: "Physics\nValidation", active: false, delay: 700 },
      { x: 0.55, y: 0.35, label: "Pattern\nAnalysis", active: false, delay: 1200 },
      { x: 0.75, y: 0.25, label: "Risk\nAssessment", active: false, delay: 1700 },
      { x: 0.75, y: 0.5, label: "Confidence\nScoring", active: false, delay: 1900 },
      { x: 0.9, y: 0.37, label: "Decision", active: false, delay: 2400 },
    ];

    // Connections between nodes
    const connections = [
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 3],
      [3, 4],
      [3, 5],
      [4, 6],
      [5, 6],
    ];

    // Particles flowing through the system
    const reverseParticles: any[] = [];

    // Questions and their target nodes for tracing
    const questions = [
      {
        text: "When was this feature selected?",
        targetNode: 1,
        path: [6, 4, 3, 1], // Decision -> Risk -> Pattern -> Feature
        delay: 4000,
      },
      {
        text: "Why did this pattern emerge?",
        targetNode: 3,
        path: [6, 5, 3], // Decision -> Confidence -> Pattern
        delay: 8000,
      },
      {
        text: "How was this validated?",
        targetNode: 2,
        path: [6, 5, 3, 2], // Decision -> Confidence -> Pattern -> Physics
        delay: 12000,
      },
    ];

    let currentQuestionIndex = -1;
    let questionActive = false;

    class ReverseParticle {
      path: number[];
      currentSegment: number;
      progress: number;
      speed: number;
      size: number;
      opacity: number;
      completed: boolean;

      constructor(path: number[]) {
        this.path = path;
        this.currentSegment = 0;
        this.progress = 0;
        this.speed = 0.008; // Slowed down from 0.015
        this.size = 3;
        this.opacity = 1;
        this.completed = false;
      }

      update() {
        if (this.completed) return;

        this.progress += this.speed;
        if (this.progress >= 1) {
          this.currentSegment++;
          this.progress = 0;
          if (this.currentSegment >= this.path.length - 1) {
            this.completed = true;
          }
        }
      }

      draw(ctx: CanvasRenderingContext2D, w: number, h: number) {
        if (this.completed || this.currentSegment >= this.path.length - 1) return;

        const startNode = nodes[this.path[this.currentSegment]];
        const endNode = nodes[this.path[this.currentSegment + 1]];
        const x = startNode.x + (endNode.x - startNode.x) * this.progress;
        const y = startNode.y + (endNode.y - startNode.y) * this.progress;

        // Glowing reverse particle
        ctx.beginPath();
        ctx.arc(x * w, y * h, this.size * 2, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(x * w, y * h, 0, x * w, y * h, this.size * 2);
        gradient.addColorStop(0, `rgba(236, 72, 153, ${this.opacity})`);
        gradient.addColorStop(1, "rgba(236, 72, 153, 0)");
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x * w, y * h, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(236, 72, 153, ${this.opacity})`;
        ctx.fill();
      }
    }

    // Animation timing
    let startTime = Date.now();

    const animate = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const elapsed = Date.now() - startTime;

      // Check for questions
      questions.forEach((q, idx) => {
        if (elapsed > q.delay && elapsed < q.delay + 2500 && currentQuestionIndex !== idx) {
          currentQuestionIndex = idx;
          questionActive = true;
          setCurrentQuestion(q.text);
          setHighlightedPath(q.path);
          // Create reverse particles for this path
          reverseParticles.length = 0;
          for (let i = 0; i < 5; i++) {
            setTimeout(() => {
              reverseParticles.push(new ReverseParticle(q.path));
            }, i * 100);
          }
        }
        if (elapsed > q.delay + 2500 && currentQuestionIndex === idx) {
          questionActive = false;
          setCurrentQuestion(null);
          setHighlightedPath([]);
        }
      });

      // Reset after all questions
      if (elapsed > 16000) {
        startTime = Date.now();
        currentQuestionIndex = -1;
        reverseParticles.length = 0;
      }

      // Clear canvas
      ctx.fillStyle = "rgba(248, 249, 250, 0.1)";
      ctx.fillRect(0, 0, w, h);

      // Draw connections with highlighting
      connections.forEach(([start, end]) => {
        const isHighlighted =
          questionActive &&
          highlightedPath.includes(start) &&
          highlightedPath.includes(end) &&
          Math.abs(highlightedPath.indexOf(start) - highlightedPath.indexOf(end)) === 1;

        ctx.strokeStyle = isHighlighted ? "rgba(236, 72, 153, 0.6)" : "rgba(26, 26, 26, 0.15)";
        ctx.lineWidth = isHighlighted ? 2 : 1;
        ctx.beginPath();
        ctx.moveTo(nodes[start].x * w, nodes[start].y * h);
        ctx.lineTo(nodes[end].x * w, nodes[end].y * h);
        ctx.stroke();

        // Animated glow on highlighted path
        if (isHighlighted) {
          const glowPulse = Math.sin(elapsed / 200) * 0.3 + 0.7;
          ctx.strokeStyle = `rgba(236, 72, 153, ${0.3 * glowPulse})`;
          ctx.lineWidth = 4;
          ctx.stroke();
        }
      });

      // Update and draw reverse particles
      reverseParticles.forEach((p, idx) => {
        p.update();
        p.draw(ctx, w, h);
        if (p.completed) {
          reverseParticles.splice(idx, 1);
        }
      });

      // Activate nodes based on delay
      nodes.forEach((node) => {
        if (elapsed > node.delay) {
          node.active = true;
        }
      });

      // Draw nodes
      nodes.forEach((node, idx) => {
        const x = node.x * w;
        const y = node.y * h;
        const isHighlighted = questionActive && highlightedPath.includes(idx);

        // Outer glow when active or highlighted
        if (node.active || isHighlighted) {
          const pulse = Math.sin(elapsed / 500) * 0.3 + 0.7;
          ctx.beginPath();
          ctx.arc(x, y, isHighlighted ? 30 : 25, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, isHighlighted ? 30 : 25);
          const color = isHighlighted ? "236, 72, 153" : "45, 156, 219";
          gradient.addColorStop(0, `rgba(${color}, ${(isHighlighted ? 0.5 : 0.3) * pulse})`);
          gradient.addColorStop(1, `rgba(${color}, 0)`);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        // Node circle
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, Math.PI * 2);
        ctx.fillStyle = isHighlighted
          ? "rgba(236, 72, 153, 0.3)"
          : node.active
          ? "rgba(45, 156, 219, 0.2)"
          : "rgba(26, 26, 26, 0.1)";
        ctx.fill();
        ctx.strokeStyle = isHighlighted
          ? "rgba(236, 72, 153, 1)"
          : node.active
          ? "rgba(45, 156, 219, 0.8)"
          : "rgba(26, 26, 26, 0.4)";
        ctx.lineWidth = isHighlighted ? 3 : 2;
        ctx.stroke();

        // Inner dot
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = isHighlighted
          ? "rgba(236, 72, 153, 1)"
          : node.active
          ? "rgba(45, 156, 219, 1)"
          : "rgba(26, 26, 26, 0.6)";
        ctx.fill();

        // Label
        ctx.fillStyle = isHighlighted
          ? "rgba(236, 72, 153, 1)"
          : node.active
          ? "rgba(26, 26, 26, 0.9)"
          : "rgba(26, 26, 26, 0.5)";
        ctx.font = isHighlighted
          ? "bold 11px Inter, system-ui, sans-serif"
          : "11px Inter, system-ui, sans-serif";
        ctx.textAlign = "center";
        const lines = node.label.split("\n");
        lines.forEach((line, i) => {
          ctx.fillText(line, x, y + 35 + i * 14);
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <section id="technology" className="py-20 bg-light-gray">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center text-dark mb-4"
        >
          {BUILT_FOR_TRUST.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto"
        >
          {BUILT_FOR_TRUST.subheadline}
        </motion.p>

        <div className="max-w-5xl mx-auto">
          {/* Visualization Canvas */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative w-full h-96 bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-md mb-8"
          >
            {currentQuestion && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 animate-fadeIn">
                <div className="bg-pink-500/20 border border-pink-500/50 rounded-lg px-6 py-3 backdrop-blur-sm">
                  <div className="text-pink-600 text-sm font-semibold flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {currentQuestion}
                  </div>
                </div>
              </div>
            )}
            <canvas
              ref={canvasRef}
              className="w-full h-full"
              style={{ width: "100%", height: "100%" }}
            />
          </motion.div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {BUILT_FOR_TRUST.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-3 h-3 rounded-full bg-primary mt-2" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-dark mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Key differentiator callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <div className="inline-block bg-primary/10 px-8 py-6 rounded-xl border-2 border-primary/20">
              <p className="text-xl font-semibold text-dark">
                <span className="text-primary">Key difference:</span> They optimize for
                performance alone.
                <br className="hidden md:block" />
                We optimize for trust.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}
