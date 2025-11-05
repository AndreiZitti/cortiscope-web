'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface ScrollProgressIndicatorProps {
  /** Current progress (0-1) */
  progress: number;
}

export default function ScrollProgressIndicator({ progress }: ScrollProgressIndicatorProps) {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!blobRef.current) return;

    // Calculate which section we're in (0, 1, or 2)
    let targetPosition = 0;
    if (progress < 0.25) {
      targetPosition = 0; // Section 1
    } else if (progress < 0.55) {
      targetPosition = 1; // Section 2
    } else {
      targetPosition = 2; // Section 3
    }

    // Animate blob to target position with morphing effect
    gsap.to(blobRef.current, {
      y: targetPosition * 60, // 60px spacing between dots
      scaleY: 1 + Math.abs(progress - (targetPosition * 0.33)) * 2, // Stretch during transition
      duration: 0.6,
      ease: 'power2.out',
      onComplete: () => {
        // Return to normal scale after arriving
        gsap.to(blobRef.current, {
          scaleY: 1,
          duration: 0.3,
          ease: 'elastic.out(1, 0.5)'
        });
      }
    });
  }, [progress]);

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40">
      {/* Container */}
      <div className="relative">
        {/* Background line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/20 rounded-full" />

        {/* Dots for each section */}
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="relative w-3 h-3 mb-[48px] last:mb-0"
            style={{ zIndex: 10 }}
          >
            <div className="w-full h-full rounded-full border-2 border-white/40" />
          </div>
        ))}

        {/* Animated blob */}
        <div
          ref={blobRef}
          className="absolute left-1/2 -translate-x-1/2 top-0 w-6 h-6 bg-primary rounded-full"
          style={{
            boxShadow: '0 0 20px rgba(0, 174, 239, 0.6), 0 0 40px rgba(0, 174, 239, 0.3)',
            filter: 'blur(1px)',
            zIndex: 20
          }}
        />
      </div>
    </div>
  );
}
