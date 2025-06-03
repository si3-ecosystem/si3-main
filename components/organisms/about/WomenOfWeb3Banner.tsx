"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import TopScrollingRow from "./TopScrollingRow";
import MiddleHeading from "./MiddleHeading";
import BottomScrollingRow from "./BottomScrollingRow";
import CentralGif from "./CentralGif";
import { cn } from "@/lib/utils";

interface WomenOfWeb3BannerProps {
  topRowTerms?: string[];
  bottomRowTerms?: string[];
  purposeTexts?: string[];
  gifUrl?: string;
  placeholderUrl?: string;
  textColor?: string;
}

export function WomenOfWeb3Banner({
  topRowTerms,
  bottomRowTerms,
  purposeTexts,
  gifUrl,
  placeholderUrl,
  textColor = "black",
}: WomenOfWeb3BannerProps) {
  const [isPaused, setIsPaused] = useState(false);

  const handleHoverChange = (isHovering: boolean) => {
    setIsPaused(isHovering);
  };

  return (
    <motion.div
      id="ecosystem"
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center py-8 max-sm:gap-44",
        textColor === "black" ? "bg-white" : "",
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <TopScrollingRow
        textColor={textColor}
        terms={topRowTerms || []}
        isPaused={isPaused}
      />
      <MiddleHeading textColor={textColor} purposeTexts={purposeTexts || []} />
      <BottomScrollingRow
        textColor={textColor}
        terms={bottomRowTerms || []}
        isPaused={isPaused}
      />
      <CentralGif
        onHoverChange={handleHoverChange}
        gifUrl={gifUrl}
        placeholderUrl={placeholderUrl}
      />
    </motion.div>
  );
}
