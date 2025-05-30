"use client";

import { useState } from "react";
import TopScrollingRow from "./TopScrollingRow";
import MiddleHeading from "./MiddleHeading";
import BottomScrollingRow from "./BottomScrollingRow";
import CentralGif from "./CentralGif";

interface WomenOfWeb3BannerProps {
  topRowTerms?: string[];
  bottomRowTerms?: string[];
  purposeTexts?: string[];
  gifUrl?: string;
  placeholderUrl?: string;
}

export function WomenOfWeb3Banner({
  topRowTerms,
  bottomRowTerms,
  purposeTexts,
  gifUrl,
  placeholderUrl,
}: WomenOfWeb3BannerProps) {
  const [isPaused, setIsPaused] = useState(false);

  const handleHoverChange = (isHovering: boolean) => {
    setIsPaused(isHovering);
  };

  return (
    <div
      id="ecosystem"
      className="relative flex min-h-screen flex-col items-center justify-center bg-[#ffffff] py-8 max-sm:gap-44"
    >
      <TopScrollingRow terms={topRowTerms || []} isPaused={isPaused} />
      <MiddleHeading purposeTexts={purposeTexts || []} />
      <BottomScrollingRow terms={bottomRowTerms || []} isPaused={isPaused} />
      <CentralGif
        onHoverChange={handleHoverChange}
        gifUrl={gifUrl}
        placeholderUrl={placeholderUrl}
      />
    </div>
  );
}
