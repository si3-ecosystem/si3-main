"use client";

import { useCallback, useEffect, useRef } from "react";
import { Title } from "@/components/atoms/title";
import { Text } from "@/components/atoms/text";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms/button";
import { Member, ProgrammingEvent } from "@/types/home";
import { SpotlightCard } from "../cards/SpotlightCard";
import { useWindowSize } from "@/hooks/useWindowsSize";
import { SiHerGuidesForm } from "../forms/siHerGuidesForm";

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
      emblaApi?.scrollNext();
    }, autoplayInterval);

    return () => {
      if (autoplayTimer.current) {
        clearInterval(autoplayTimer.current);
        autoplayTimer.current = null;
      }
    };
  }, [emblaApi, autoplay, autoplayInterval, isMobile]);

  const slides: (Member | ProgrammingEvent)[][] = [];
  for (let i = 0; i < items.length; i += 3) {
    slides.push(items.slice(i, i + 3));
  }

  return (
    <section className="@container -mt-[86px] w-full">
      <div className="w-full">
        <div
          className={cn(
            "flex h-full w-full flex-col justify-between gap-8 lg:flex-row",
            className,
          )}
        >
          <div className="space-y-2">
            {title && (
              <Title className="!text-xl font-bold max-lg:mb-4 max-lg:text-center lg:!text-[45px]">
                {title}
              </Title>
            )}
            {description && (
              <Text
                variant="xl"
                className="max-w-[580px] text-black lg:mb-8 lg:!text-[20px]"
              >
                {description}
              </Text>
            )}

            <div className="mb-6 hidden lg:block">
              <SiHerGuidesForm title={"APPLY NOW"} className="" fill={true} />
            </div>
          </div>
          <div className="mt-16 flex items-center justify-end gap-2 max-lg:hidden">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              className="rounded-full hover:!bg-black"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              className="rounded-full hover:!bg-black"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>

        <div className="relative w-full overflow-hidden sm:hidden">
          <div className="w-full" ref={emblaRef}>
            <div className="mt-16 flex w-full lg:mt-0">
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
            <div className="mt-16 flex w-full flex-col gap-6 sm:flex-row sm:gap-0 lg:mt-0">
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

        <div className="block lg:hidden">
          <SiHerGuidesForm title={"APPLY NOW"} className="" fill={true} />
        </div>
      </div>
    </section>
  );
}
