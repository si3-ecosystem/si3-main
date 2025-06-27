// components/molecules/cards/MovingLogos.tsx
"use client";

import {
  useCallback,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useEffect,
} from "react";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";
import { Partner } from "@/types/home";
import useEmblaCarousel from "embla-carousel-react";

export interface MovingLogosRef {
  scrollPrev: () => void;
  scrollNext: () => void;
}

interface MovingLogosProps {
  partners: Partner[];
  onPrev?: () => void;
  onNext?: () => void;
}

export const MovingLogos = forwardRef<MovingLogosRef, MovingLogosProps>(
  ({ partners, onPrev, onNext }, ref) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
      align: "start",
      containScroll: "keepSnaps",
      loop: true,
      skipSnaps: false,
    });

    useEffect(() => {
      if (!emblaApi || partners.length <= 3) return;

      const timer = setInterval(() => {
        emblaApi.scrollNext();
      }, 3000);

      return () => clearInterval(timer);
    }, [emblaApi, partners.length]);

    const scrollBy = useCallback(
      (direction: "prev" | "next") => {
        if (!emblaApi) return;

        const currentIndex = emblaApi.selectedScrollSnap();
        const scrollTo =
          direction === "next"
            ? Math.min(currentIndex + 3, partners.length - 1)
            : Math.max(currentIndex - 3, 0);

        emblaApi.scrollTo(scrollTo);
      },
      [emblaApi, partners.length],
    );

    const scrollPrev = useCallback(() => {
      scrollBy("prev");
      onPrev?.();
    }, [onPrev, scrollBy]);

    const scrollNext = useCallback(() => {
      scrollBy("next");
      onNext?.();
    }, [onNext, scrollBy]);

    useImperativeHandle(
      ref,
      () => ({
        scrollPrev,
        scrollNext,
      }),
      [scrollPrev, scrollNext],
    );

    const slideWidthClass = useMemo(() => {
      if (partners.length === 1) return "w-full";
      if (partners.length === 2) return "w-1/2";
      return "w-1/3";
    }, [partners.length]);

    if (!partners?.length) return null;

    return (
      <div className="w-full overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {partners.map((partner, index) => (
            <div
              key={`${partner._id}-${index}`}
              className={`flex h-6 ${slideWidthClass} flex-shrink-0 items-center justify-center px-2`}
            >
              {partner.logo && (
                <Image
                  src={urlForImage(partner.logo)?.src || ""}
                  alt={partner.name}
                  width={120}
                  height={32}
                  className="h-auto max-h-full w-auto max-w-full object-contain"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  },
);

MovingLogos.displayName = "MovingLogos";
