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
  const isMobile = windowWidth < 640;
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

  useEffect(() => {
    if (emblaApi) emblaApi.reInit();
  }, [emblaApi, items, windowWidth]);

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

        <div className="relative w-full overflow-hidden" ref={emblaRef}>
          <div className="-mx-3 mt-16 grid auto-cols-[100%] grid-flow-col sm:auto-cols-[50%] lg:mt-0">
            {items.map((item, index) => (
              <div key={index} className="px-3">
                {renderFunction(item, index)}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 block lg:hidden">
          <SiHerGuidesForm title={"APPLY NOW"} className="" fill={true} />
        </div>
      </div>
    </section>
  );
}
