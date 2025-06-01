"use client";

import { useEffect, useRef } from "react";

interface BottomScrollingRowProps {
  terms: string[];
  isPaused: boolean;
}

export default function BottomScrollingRow({
  terms,
  isPaused,
}: BottomScrollingRowProps) {
  // Duplicate terms for seamless loop
  const duplicatedTerms = [...terms, ...terms];
  
  // Track animation progress
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number>(0);
  const progressRef = useRef<number>(0);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const totalDuration = 25000; // 25 seconds in ms
    const totalDistance = container.scrollWidth / 2; // Half of the duplicated content
    
    const animate = (timestamp: number) => {
      if (!lastTimestampRef.current) {
        lastTimestampRef.current = timestamp;
      }
      
      const elapsed = timestamp - lastTimestampRef.current;
      lastTimestampRef.current = timestamp;
      
      // Update progress (0 to 1 represents a full cycle)
      progressRef.current += elapsed / totalDuration;
      if (progressRef.current >= 1) {
        progressRef.current %= 1; // Keep within 0-1 range
      }
      
      // Calculate position based on progress - note this goes in the opposite direction
      // compared to TopScrollingRow (from right to left)
      const position = (1 - progressRef.current) * totalDistance * -1;
      container.style.transform = `translateX(${position}px)`;
      
      // Continue animation
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start or stop animation based on isPaused
    if (!isPaused) {
      animationRef.current = requestAnimationFrame(animate);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused]);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        ref={containerRef}
        className="flex space-x-8 text-lg font-bold whitespace-nowrap text-black md:text-xl lg:text-2xl"
      >
        {duplicatedTerms.map((term, index) => (
          <span key={index} className="flex-shrink-0">
            {term}
          </span>
        ))}
      </div>

      {/* Left fade edge */}
      <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-20 bg-gradient-to-r from-[#ffffff] to-transparent" />

      {/* Right fade edge */}
      <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-20 bg-gradient-to-l from-[#ffffff] to-transparent" />
    </div>
  );
}
