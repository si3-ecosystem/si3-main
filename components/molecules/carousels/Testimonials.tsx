"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";
import { TestimonialsCard } from "../cards/TestimonialsCard";
import { Testimonial } from "@/types/home";
import { Title } from "@/components/atoms/title";
import { useWindowSize } from "@/hooks/useWindowsSize";

interface TestimonialsProps {
  title: string;
  items: Testimonial[];
}

const options = {
  loop: true,
  align: "center" as const,
  containScroll: "trimSnaps" as const,
};

export function Testimonials({ title, items }: TestimonialsProps) {
  // Desktop carousel
  const [desktopEmblaRef, desktopEmblaApi] = useEmblaCarousel(options);
  // Mobile carousel
  const [mobileEmblaRef, mobileEmblaApi] = useEmblaCarousel({
    ...options,
    dragFree: true,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const autoPlayInterval = 5000; // 5 seconds
  const { width: windowWidth } = useWindowSize();
  const isMobile = windowWidth < 768; // 768px is the breakpoint for md in Tailwind
  const autoplayTimer = useRef<NodeJS.Timeout | null>(null);

  // Navigation functions
  const scrollPrev = useCallback(() => {
    desktopEmblaApi?.scrollPrev();
    mobileEmblaApi?.scrollPrev();
  }, [desktopEmblaApi, mobileEmblaApi]);

  const scrollNext = useCallback(() => {
    desktopEmblaApi?.scrollNext();
    mobileEmblaApi?.scrollNext();
  }, [desktopEmblaApi, mobileEmblaApi]);

  // Handle carousel selection
  const onSelect = useCallback(() => {
    if (desktopEmblaApi) {
      setSelectedIndex(desktopEmblaApi.selectedScrollSnap());
    } else if (mobileEmblaApi) {
      setSelectedIndex(mobileEmblaApi.selectedScrollSnap());
    }
  }, [desktopEmblaApi, mobileEmblaApi]);

  // Auto-scroll functionality for mobile only
  useEffect(() => {
    if (!autoPlay || !isMobile) {
      if (autoplayTimer.current) {
        clearInterval(autoplayTimer.current);
        autoplayTimer.current = null;
      }
      return;
    }

    autoplayTimer.current = setInterval(() => {
      mobileEmblaApi?.scrollNext();
      desktopEmblaApi?.scrollNext();
    }, autoPlayInterval);

    return () => {
      if (autoplayTimer.current) {
        clearInterval(autoplayTimer.current);
        autoplayTimer.current = null;
      }
    };
  }, [autoPlay, autoPlayInterval, isMobile, mobileEmblaApi, desktopEmblaApi]);

  // Setup event listeners for both carousels
  useEffect(() => {
    const setupCarousel = (api: EmblaCarouselType | undefined) => {
      if (!api) return () => {};

      onSelect();
      api.on("select", onSelect);

      // Only pause on interaction if we're on mobile and autoplay is enabled
      if (isMobile && autoPlay) {
        api.on("pointerDown", () => setAutoPlay(false));
        api.on("pointerUp", () => setAutoPlay(true));
      }

      return () => {
        api.off("select", onSelect);
        if (isMobile && autoPlay) {
          api.off("pointerDown", () => setAutoPlay(false));
          api.off("pointerUp", () => setAutoPlay(true));
        }
      };
    };

    const cleanupDesktop = setupCarousel(desktopEmblaApi);
    const cleanupMobile = setupCarousel(mobileEmblaApi);

    return () => {
      cleanupDesktop();
      cleanupMobile();
    };
  }, [desktopEmblaApi, mobileEmblaApi, onSelect, isMobile, autoPlay]);

  return (
    <div className="mx-auto mt-2 h-full w-full">
      <div className="mb-6 flex w-full items-center justify-between lg:items-start">
        <Title className="w-full text-center !text-xl font-bold max-lg:mx-auto max-sm:max-w-[240px] sm:text-left lg:text-left lg:!text-3xl">
          {title}
        </Title>
      </div>

      {/* Desktop Carousel */}
      <div
        className="hidden h-fit overflow-hidden md:block"
        ref={desktopEmblaRef}
      >
        <div className="@container -ml-4 flex w-full">
          {items.map((item, index) => (
            <div
              key={`desktop-${index}`}
              className="h-full w-full min-w-0 flex-[0_0_100%] pl-4"
            >
              <TestimonialsCard item={item} />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Carousel */}
      <div className="h-fit overflow-hidden md:hidden" ref={mobileEmblaRef}>
        <div className="flex w-full">
          {items.map((item, index) => (
            <div
              key={`mobile-${index}`}
              className="h-full w-full min-w-0 flex-[0_0_100%] px-2 sm:px-4"
            >
              <TestimonialsCard item={item} />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="mt-6 flex justify-center gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === selectedIndex ? "w-8 bg-black" : "w-2 bg-[#D9D9D9]"
            }`}
            onClick={() => {
              desktopEmblaApi?.scrollTo(index);
              mobileEmblaApi?.scrollTo(index);
            }}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
