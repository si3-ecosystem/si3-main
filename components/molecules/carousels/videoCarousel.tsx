"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/atoms/carousel";
import { Title } from "@/components/atoms/title";
import { Text } from "@/components/atoms/text";
import { EducationCard } from "../cards/educationCard";

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
  renderItem?: RenderItemFunction;
}

export function VideoCarousel({
  title,
  description,
  items,
  itemsPerSlide,
  renderItem,
}: VideoCarouselProps) {
  const effectiveItemsPerSlide = Math.min(
    Math.max(1, itemsPerSlide),
    items.length,
  );

  const defaultRenderItem = (item: VideoCardItem, index: number) => (
    <EducationCard item={item} key={index} />
  );

  // Use renderItem if provided, otherwise use defaultRenderItem
  const renderFunction = renderItem || defaultRenderItem;

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
        </div>
        <Carousel
          opts={{
            align: "start",
            slidesToScroll: effectiveItemsPerSlide,
          }}
          className="w-full"
        >
          <CarouselContent>
            {Array.from({
              length: Math.ceil(items.length / (effectiveItemsPerSlide * 3)),
            }).map((_, slideIndex) => (
              <CarouselItem
                key={slideIndex}
                className="mt-12 w-full basis-full lg:mt-4"
              >
                <div className="grid h-full w-full grid-cols-1 gap-6 @xl:grid-cols-2 @3xl:grid-cols-3">
                  {items
                    .slice(
                      slideIndex * effectiveItemsPerSlide * 3,
                      (slideIndex + 1) * effectiveItemsPerSlide * 3,
                    )
                    .map((item, index) => renderFunction(item, index))}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute top-0 z-20 flex justify-center gap-2 max-lg:left-5 lg:-top-12 lg:right-12">
            <CarouselPrevious className="hover:gradient ml-6 cursor-pointer border border-gray-300 text-[#020202]" />
            <CarouselNext className="ml-6 cursor-pointer border border-gray-300 text-[#020202]" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
