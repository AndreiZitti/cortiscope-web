"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type AnimationOption = '1' | '2' | '3' | '4';

interface AnimationContextType {
  currentAnimation: AnimationOption;
  setCurrentAnimation: (option: AnimationOption) => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export function AnimationProvider({ children }: { children: ReactNode }) {
  const [currentAnimation, setCurrentAnimation] = useState<AnimationOption>('3');

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('animationOption');
    if (saved && ['1', '2', '3', '4'].includes(saved)) {
      setCurrentAnimation(saved as AnimationOption);
    }
  }, []);

  // Save to localStorage when changed
  const handleSetAnimation = (option: AnimationOption) => {
    setCurrentAnimation(option);
    localStorage.setItem('animationOption', option);
  };

  return (
    <AnimationContext.Provider value={{ currentAnimation, setCurrentAnimation: handleSetAnimation }}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation() {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
}
