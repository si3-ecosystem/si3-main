"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function MiddleHeading({
  purposeTexts,
  textColor,
}: {
  purposeTexts: string[];
  textColor?: string;
}) {
  return (
    <div className="relative mx-auto mb-8 w-full text-center">
      <motion.h1
        className={cn(
          "font-clesmont text-7xl leading-tight font-bold tracking-tight whitespace-nowrap text-black max-sm:text-5xl md:text-8xl lg:text-9xl 2xl:text-[190px]",
          textColor === "black" ? "text-black" : "text-white",
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {purposeTexts.join(" ")}
      </motion.h1>

      {/* Left fade edge */}
      <div
        className={cn(
          "pointer-events-none absolute top-0 left-0 z-10 h-full w-20 bg-gradient-to-r from-[#ffffff] to-transparent",
          textColor === "black" ? "from-[#ffffff]" : "hidden",
        )}
      />

      {/* Right fade edge */}
      <div
        className={cn(
          "pointer-events-none absolute top-0 right-0 z-10 h-full w-20 bg-gradient-to-l from-[#ffffff] to-transparent",
          textColor === "black" ? "from-[#ffffff]" : "hidden",
        )}
      />
    </div>
  );
}
