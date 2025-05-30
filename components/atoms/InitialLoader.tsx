"use client";

import { useEffect, useState } from "react";
import { LottieAnimation } from "./LottieAnimation";
import AnimateLoading from "@/public/loading.json";
import Image from "next/image";

export function InitialLoader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="absolute inset-0 z-[9999] flex h-screen w-screen items-center justify-center overflow-hidden bg-white">
        <div className="">
          <Image
            src="/loadingbg.svg"
            alt="loadingbg"
            fill
            className="h-full w-full object-cover object-center"
          />
          <LottieAnimation
            animationData={AnimateLoading}
            loop={true}
            autoplay={true}
            height="100%"
            width="100%"
            className=""
          />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
