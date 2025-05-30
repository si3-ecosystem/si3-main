"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

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
  const controls = useAnimation();

  useEffect(() => {
    if (isPaused) {
      controls.stop();
    } else {
      controls.start({
        x: ["-50%", 0],
        transition: {
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        },
      });
    }
  }, [isPaused, controls]);

  return (
    <div className="relative w-full overflow-hidden">
      <motion.div
        className="flex space-x-8 text-lg font-bold whitespace-nowrap text-black md:text-xl lg:text-2xl"
        animate={controls}
      >
        {duplicatedTerms.map((term, index) => (
          <span key={index} className="flex-shrink-0">
            {term}
          </span>
        ))}
      </motion.div>

      {/* Left fade edge */}
      <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-20 bg-gradient-to-r from-[#ffffff] to-transparent" />

      {/* Right fade edge */}
      <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-20 bg-gradient-to-l from-[#ffffff] to-transparent" />
    </div>
  );
}
