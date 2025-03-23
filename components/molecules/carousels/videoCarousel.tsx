"use client";

import { useCallback, useEffect } from "react";
import { Title } from "@/components/atoms/title";
import { Text } from "@/components/atoms/text";
import { EducationCard } from "../cards/educationCard";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { Course, Community } from "@/types/home";

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
}

export function VideoCarousel({
  title,
  description,
  items,
  itemsPerSlide,
  autoplay = false,
  autoplayInterval = 3000,
  renderItem,
}: VideoCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const effectiveItemsPerSlide = Math.min(
    Math.max(1, itemsPerSlide),
    items.length,
  );

  // Default render function
  const defaultRenderItem = (item: Course | Community, index: number) => {
    if ("title" in item) {
      return <EducationCard item={item} key={index} />;
    }
    return null;
  };
  const renderFunction = renderItem || defaultRenderItem;

  // Navigation controls
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Autoplay functionality
  useEffect(() => {
    if (!emblaApi || !autoplay) return;

    const autoplayTimer = setInterval(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, autoplayInterval);

    return () => clearInterval(autoplayTimer);
  }, [emblaApi, autoplay, autoplayInterval]);

  const slides: (Course | Community)[][] = [];
  for (let i = 0; i < items.length; i += 3) {
    slides.push(items.slice(i, i + 3));
  }

  return (
    <section className="@container w-full bg-white">
      <div className="w-full">
        <div className="flex w-full flex-col justify-between lg:flex-row lg:gap-8">
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
              <Text variant="xl" className="mb-8 max-w-[580px] text-[#454545]">
                {description}
              </Text>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              disabled={!emblaApi?.canScrollPrev()}
              className="rounded-full hover:!bg-black hover:text-white"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              disabled={!emblaApi?.canScrollNext()}
              className="rounded-full hover:!bg-black hover:text-white"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="mt-8 -ml-6 flex lg:mt-8">
              {slides.map((slideItems, slideIndex) => (
                <div key={slideIndex} className="min-w-0 flex-[0_0_100%] pl-6">
                  <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
      </div>
    </section>
  );
}
