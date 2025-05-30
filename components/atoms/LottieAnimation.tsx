"use client";

import { useRef, useEffect } from "react";
import Lottie, {
  LottieRefCurrentProps,
  LottieComponentProps,
} from "lottie-react";

// Type for Lottie animation data
type LottieAnimationData = LottieComponentProps["animationData"];

interface LottieAnimationProps {
  animationData: LottieAnimationData;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  height?: number | string;
  width?: number | string;
}

export function LottieAnimation({
  animationData,
  loop = true,
  autoplay = true,
  height = "100%",
  width = "100%",
}: LottieAnimationProps) {
  const animationRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (animationRef.current && autoplay) {
      animationRef.current.play();
    }
  }, [autoplay]);

  return (
    <div
      style={{ width, height }}
      className={
        "absolute inset-0 z-[9999] flex h-screen w-screen items-center justify-center"
      }
    >
      <Lottie
        lottieRef={animationRef}
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        className="max-lg:scale-[1.8]"
      />
    </div>
  );
}
