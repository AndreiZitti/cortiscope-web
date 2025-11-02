"use client";

import React from "react";
import { useAnimation } from "@/contexts/AnimationContext";
import GeometricWipe from "./animations/GeometricWipe";
import SequentialEdgeDraw from "./animations/SequentialEdgeDraw";
import FlipAssembly from "./animations/FlipAssembly";

export default function ProblemToSolution() {
  const { currentAnimation } = useAnimation();

  return (
    <>
      {currentAnimation === '1' && <SequentialEdgeDraw key="anim-1" />}
      {currentAnimation === '3' && <GeometricWipe key="anim-3" />}
      {currentAnimation === '4' && <FlipAssembly key="anim-4" />}
    </>
  );
}
