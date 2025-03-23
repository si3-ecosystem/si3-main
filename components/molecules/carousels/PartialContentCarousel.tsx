"use client";

import { useCallback, useEffect } from "react";
import { Title } from "@/components/atoms/title";
import { Text } from "@/components/atoms/text";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms/button";
import { Member, ProgrammingEvent } from "@/types/home";
import { SpotlightCard } from "../cards/SpotlightCard";

export type RenderItemFunction = (
  item: Member | ProgrammingEvent,
  index: number,
) => React.ReactNode;

export interface PartialContentCarouselProps {
  title?: string;
  description?: string;
  items: Member[] | ProgrammingEvent[];
  autoplay?: boolean;
  autoplayInterval?: number;
  renderItem?: RenderItemFunction;
  className?: string;
  partialLastItem?: boolean;
}

export function PartialContentCarousel({
  title,
  description,
  items,
  autoplay = false,
  autoplayInterval = 3000,
  renderItem,
  className,
}: PartialContentCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: 1,
    align: "start",
    containScroll: "trimSnaps",
    breakpoints: {
      "(max-width: 640px)": { slidesToScroll: 1, align: "start" },
    },
  });

  const defaultRenderItem = (
    item: Member | ProgrammingEvent,
    index: number,
  ) => {
    if ("title" in item) {
      return (
        <SpotlightCard
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          item={item}
          key={index}
        />
      );
    }
    return null;
  };

  const renderFunction = renderItem || defaultRenderItem;

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi || !autoplay) return;

    const autoplayTimer = setInterval(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, autoplayInterval);

    return () => clearInterval(autoplayTimer);
  }, [emblaApi, autoplay, autoplayInterval]);

  const slides: (Member | ProgrammingEvent)[][] = [];
  for (let i = 0; i < items.length; i += 3) {
    slides.push(items.slice(i, i + 3));
  }

  return (
    <section className="@container w-full bg-white">
      <div className="w-full">
        <div
          className={cn(
            "flex w-full flex-col justify-between gap-8 lg:flex-row",
            className,
          )}
        >
          <div className="space-y-2">
            {title && (
              <Title
                variant="sm"
                className="mb-4 text-start text-3xl font-bold"
              >
                {title}
              </Title>
            )}
            {description && (
              <Text
                variant="xl"
                className="max-w-[580px] text-[#454545] lg:mb-8"
              >
                {description}
              </Text>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              className="rounded-full hover:!bg-black hover:text-white"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              className="rounded-full hover:!bg-black hover:text-white"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>

        <div className="relative w-full overflow-hidden sm:hidden">
          <div className="w-full" ref={emblaRef}>
            <div className="mt-16 flex w-full lg:mt-8">
              {slides.map((slideItems, slideIndex) => (
                <div
                  key={slideIndex}
                  className={cn(
                    "min-w-0 flex-[0_0_100%] sm:pl-6",
                    "sm:basis-[100%] sm:flex-col sm:gap-6",
                    "md:basis-1/4 md:flex-row md:gap-6",
                  )}
                >
                  {slideItems.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className={cn(
                        "w-full transition-all duration-300 sm:pr-6",
                        "sm:basis-full",
                        "max-sm:mb-6 md:basis-1/3 lg:basis-1/3",
                      )}
                    >
                      {renderFunction(item, slideIndex * 3 + itemIndex)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="relative w-full overflow-hidden max-sm:hidden">
          <div className="w-full" ref={emblaRef}>
            <div className="mt-16 flex w-full flex-col gap-6 sm:flex-row sm:gap-0 lg:mt-8">
              {items.map((slideItems, slideIndex) => (
                <div
                  key={slideIndex}
                  className={cn(
                    "basis-[100%] pr-6 transition-all duration-300 sm:basis-[85%] md:basis-1/4",
                  )}
                >
                  {renderFunction(slideItems, slideIndex)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
