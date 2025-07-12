"use client";

import { useEffect, useState } from "react";
import { LottieAnimation } from "./LottieAnimation";
import AnimateLoading from "@/public/loading.json";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function InitialLoader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // const hasVisited = localStorage.getItem("hasVisited");

    const timer = setTimeout(() => {
      setIsLoading(false);
      // localStorage.setItem("hasVisited", "true");
    }, 5000);

    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        if (window.location.hash) {
          const el = document.querySelector(window.location.hash);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }
      }, 100);
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[9999] flex h-screen w-screen items-center justify-center overflow-hidden bg-white">
        <div className="relative h-full w-full">
          <Image
            src="/loadingbg.svg"
            alt="loadingbg"
            fill
            className="object-cover object-center"
            priority
          />
          <LottieAnimation
            animationData={AnimateLoading}
            loop={true}
            autoplay={true}
            height="100%"
            width="100%"
            className="scale-75"
          />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
