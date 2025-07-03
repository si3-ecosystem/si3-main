"use client";

import { useCallback, useEffect, useRef } from "react";
import { Title } from "@/components/atoms/title";
import { Text } from "@/components/atoms/text";
import { EducationCard } from "../cards/educationCard";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { Course, Community } from "@/types/home";
import { useWindowSize } from "@/hooks/useWindowsSize";
// import Link from "next/link";
import { ScholarsPartnerForm } from "../forms/ScholarsPartnerForm";

export type RenderItemFunction = (
  item: Course | Community,
  index: number,
) => React.ReactNode;

export interface VideoCarouselProps {
  title?: string;
  description?: string;
  items: Course[] | Community[];
  itemsPerSlide: number;
  autoplay?: boolean;
  autoplayInterval?: number;
  renderItem?: RenderItemFunction;
  hidetitleAndDescription?: boolean;
  joinWaitlist?: boolean;
}

export function VideoCarousel({
  title,
  description,
  items,
  itemsPerSlide,
  autoplay = false,
  autoplayInterval = 3000,
  renderItem,
  hidetitleAndDescription,
  joinWaitlist = false,
}: VideoCarouselProps) {
  const [desktopEmblaRef, desktopEmblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const [mobileEmblaRef, mobileEmblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const effectiveItemsPerSlide = Math.min(
    Math.max(1, itemsPerSlide),
    items.length,
  );

  const defaultRenderItem = (item: Course | Community, index: number) => {
    if ("title" in item) {
      return <EducationCard item={item} key={index} />;
    }
    return null;
  };
  const renderFunction = renderItem || defaultRenderItem;

  const scrollPrev = useCallback(() => {
    desktopEmblaApi?.scrollPrev();
    mobileEmblaApi?.scrollPrev();
  }, [desktopEmblaApi, mobileEmblaApi]);

  const scrollNext = useCallback(() => {
    desktopEmblaApi?.scrollNext();
    mobileEmblaApi?.scrollNext();
  }, [desktopEmblaApi, mobileEmblaApi]);

  const { width: windowWidth } = useWindowSize();
  const isMobile = windowWidth < 768;
  const autoplayTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!autoplay || !isMobile) {
      if (autoplayTimer.current) {
        clearInterval(autoplayTimer.current);
        autoplayTimer.current = null;
      }
      return;
    }

    autoplayTimer.current = setInterval(() => {
      mobileEmblaApi?.scrollNext();
    }, autoplayInterval);

    return () => {
      if (autoplayTimer.current) {
        clearInterval(autoplayTimer.current);
        autoplayTimer.current = null;
      }
    };
  }, [mobileEmblaApi, autoplay, autoplayInterval, isMobile]);

  const slides: (Course | Community)[][] = [];
  for (let i = 0; i < items.length; i += 3) {
    slides.push(items.slice(i, i + 3));
  }

  return (
    <section className="@container">
      <div className="w-full">
        <div className="flex w-full flex-col justify-between lg:flex-row lg:gap-8">
          {!hidetitleAndDescription && (
            <div className="w-full space-y-2">
              {title && (
                <Title
                  variant="sm"
                  className="mb-4 text-center !text-xl font-bold lg:mb-1 lg:text-start lg:!text-[45px]"
                >
                  {title}
                </Title>
              )}
              {description && (
                <Text variant="xl" className="mb-8 w-full max-w-[580px]">
                  {description}
                </Text>
              )}
              <div className="max-lg:hidden">
                {joinWaitlist && <ScholarsPartnerForm fill={true} />}
              </div>
            </div>
          )}
          <div className="mt-16 flex w-full items-center justify-end gap-2 max-lg:hidden">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              disabled={
                !desktopEmblaApi?.canScrollPrev() &&
                !mobileEmblaApi?.canScrollPrev()
              }
              className="rounded-full hover:!bg-black"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              disabled={
                !desktopEmblaApi?.canScrollNext() &&
                !mobileEmblaApi?.canScrollNext()
              }
              className="rounded-full hover:!bg-black"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Desktop Carousel */}
        <div className="relative max-sm:hidden">
          <div className="overflow-hidden" ref={desktopEmblaRef}>
            <div className="mt-8 -ml-6 flex lg:mt-8">
              {slides.map((slideItems, slideIndex) => (
                <div key={slideIndex} className="min-w-0 flex-[0_0_100%] pl-6">
                  <div className="flex h-full flex-col justify-between gap-6 sm:grid md:grid-cols-2 lg:grid-cols-3">
                    {slideItems.map((item, itemIndex) =>
                      renderFunction(
                        item,
                        slideIndex * effectiveItemsPerSlide + itemIndex,
                      ),
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Carousel */}
        <div className="relative sm:hidden">
          <div className="overflow-hidden" ref={mobileEmblaRef}>
            <div className="mt-8 -ml-6 flex">
              {items.map((item, index) => (
                <div key={index} className="min-w-0 flex-[0_0_100%] pl-6">
                  <div className="pr-6">{renderFunction(item, index)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 lg:hidden">
          {joinWaitlist && <ScholarsPartnerForm fill={true} />}
        </div>
      </div>
    </section>
  );
}
