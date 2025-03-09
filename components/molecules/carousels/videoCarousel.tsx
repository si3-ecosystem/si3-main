"use client";

import { useCallback, useEffect } from "react";
import { Title } from "@/components/atoms/title";
import { Text } from "@/components/atoms/text";
import { EducationCard } from "../cards/educationCard";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface VideoCardItem {
  title: string;
  subtitle: string;
  imageUrl: string;
  videoUrl?: string;
}

export type RenderItemFunction = (
  item: VideoCardItem,
  index: number,
) => React.ReactNode;

export interface VideoCarouselProps {
  title?: string;
  description?: string;
  items: VideoCardItem[];
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
  const defaultRenderItem = (item: VideoCardItem, index: number) => (
    <EducationCard item={item} key={index} />
  );
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

  // Split items into slides
  const slides = [];
  for (let i = 0; i < items.length; i += effectiveItemsPerSlide) {
    slides.push(items.slice(i, i + effectiveItemsPerSlide));
  }

  return (
    <section className="@container w-full bg-white">
      <div className="w-full">
        <div className="flex w-full flex-col justify-between gap-8 lg:flex-row">
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
              <Text variant="xl" className="mb-8 text-[#454545]">
                {description}
              </Text>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={scrollPrev}
              className="cursor-pointer rounded-full border border-gray-300 p-2 text-[#020202] hover:bg-[#e9e3ff] disabled:opacity-50"
              disabled={!emblaApi?.canScrollPrev()}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={scrollNext}
              className="cursor-pointer rounded-full border border-gray-300 p-2 text-[#020202] hover:bg-[#e9e3ff] disabled:opacity-50"
              disabled={!emblaApi?.canScrollNext()}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="mt-16 flex lg:mt-8">
              {slides.map((slideItems, slideIndex) => (
                <div key={slideIndex} className="min-w-0 flex-[0_0_100%]">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
