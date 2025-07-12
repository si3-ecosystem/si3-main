// components/molecules/cards/Grow3dgePopupCard.tsx
"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { usePlausible } from "next-plausible";
import { useQuery } from "@tanstack/react-query";
import { getHomePageData } from "@/lib/sanity/client";
import { HomepageSchema } from "@/types/home";
import { MovingLogos } from "./MovingLogos";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { closeGrow3dgeModal } from "@/redux/slice/grow3dgeSlice";
import { urlForImage } from "@/lib/sanity/image";
import { useCallback, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Grow3dgePopupCard() {
  const plausible = usePlausible();
  const isOpen = useAppSelector((state) => state.grow3dge.isOpen);
  const dispatch = useAppDispatch();
  const { data } = useQuery<HomepageSchema>({
    queryKey: ["homepage"],
    queryFn: getHomePageData,
  });

  const handleDismiss = () => {
    plausible("CTA Popup Closed");
    dispatch(closeGrow3dgeModal());
  };

  const growthCarousel = data?.growthCarousel || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? growthCarousel.length - 1 : prevIndex - 1,
    );
  }, [growthCarousel.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === growthCarousel.length - 1 ? 0 : prevIndex + 1,
    );
  }, [growthCarousel.length]);

  useEffect(() => {
    if (!isOpen || growthCarousel.length <= 1) return;

    const timer = setInterval(() => {
      handleNext();
    }, 2500);

    return () => clearInterval(timer);
  }, [currentIndex, isOpen, growthCarousel.length, handleNext]);

  if (!isOpen || !growthCarousel || growthCarousel.length === 0) return null;

  const currentModule = growthCarousel[currentIndex];
  const partners = currentModule?.partners || [];

  if (!open) return null;

  return (
    <div
      className="fixed right-0 bottom-6 z-50 block w-full max-w-[497px] overflow-hidden rounded-none border-2 border-[#8963d6] bg-transparent p-0 outline-none lg:right-6 lg:rounded-md"
      onClick={() => plausible("CTA Popup Clicked")}
    >
      <div className="relative h-full w-full overflow-hidden bg-white/60 p-0 backdrop-blur-sm">
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 !z-30 cursor-pointer text-black"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        {data?.growthImage && (
          <Image
            src={urlForImage(data?.growthImage)?.src || ""}
            alt={data?.growthImage?.alt || ""}
            fill
            className="absolute inset-0 h-full w-full overflow-hidden object-cover object-center"
          />
        )}

        <div className="flex h-full w-full flex-row bg-transparent p-0 lg:gap-5 lg:p-4">
          <div className="relative z-20 flex flex-1 flex-col justify-between pb-2 max-lg:p-3">
            <div className="z-30 mb-6 flex flex-col items-center gap-1 max-sm:mb-0.5">
              <p className="text-center text-xs font-medium text-white">
                {data?.growthData}
              </p>
              <h3 className="text-center text-3xl font-semibold text-gray-900">
                {data?.growthTitle}
              </h3>
              <p className="mx-auto w-full max-w-[277px] text-center text-[10px] sm:text-xs">
                {data?.growthContent}
              </p>
            </div>

            <div className="growth-card relative mx-auto w-full max-w-[270px] overflow-visible rounded-lg bg-[#FBACF8] p-1 max-sm:pt-2 sm:space-y-2">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="h-4 text-center text-xs font-medium"
                >
                  {currentModule?.title}
                </motion.p>
              </AnimatePresence>
              <div className="relative flex items-center">
                <button
                  onClick={handlePrev}
                  disabled={growthCarousel.length <= 1}
                  className="absolute -top-2.5 -left-4 z-10 rounded-full p-1 shadow-md disabled:opacity-50"
                  aria-label="Previous partner"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="13"
                    viewBox="0 0 10 13"
                    fill="none"
                  >
                    <path
                      d="M7.75117e-08 6.5L9.75 0.870834L9.75 12.1292L7.75117e-08 6.5Z"
                      fill="#FAFAFA"
                    />
                  </svg>
                </button>

                <div className="w-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <MovingLogos partners={partners} />
                    </motion.div>
                  </AnimatePresence>
                </div>

                <button
                  onClick={handleNext}
                  disabled={growthCarousel.length <= 1}
                  className="absolute -top-2.5 -right-4 z-10 rounded-full p-1 shadow-md disabled:opacity-50"
                  aria-label="Next partner"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="13"
                    viewBox="0 0 10 13"
                    fill="none"
                  >
                    <path
                      d="M10 6.5L0.25 12.1292L0.250001 0.870834L10 6.5Z"
                      fill="#FAFAFA"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
