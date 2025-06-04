"use client";

import React, { useEffect, useCallback, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/atoms/button";
import { TestimonialsCard } from "../cards/TestimonialsCard";
import { Testimonial } from "@/types/home";

interface TestimonialsProps {
  title: string;
  items: Testimonial[];
  isCover: boolean;
}

const options = {
  loop: true,
  align: "center",
  containScroll: "trimSnaps",
};

export function Testimonials({
  title,
  items,
  isCover = false,
}: TestimonialsProps) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const scrollPrev = () => {
    if (emblaApi) emblaApi.scrollPrev();
  };

  const scrollNext = () => {
    if (emblaApi) emblaApi.scrollNext();
  };

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="mx-auto h-full w-full">
      <div className="mb-12 flex items-center justify-between">
        <h2 className="!lg:text-3xl text-xl font-bold tracking-tight text-black lg:text-white">
          {title}
        </h2>
        <div className="flex gap-2">
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

      <div className="h-full overflow-hidden" ref={emblaRef}>
        <div className="4 @container -ml-4 flex h-full w-full">
          {items.map((item, index) => (
            <div
              key={index}
              className="h-full w-full min-w-0 flex-[0_0_100%] pl-4"
              style={{ transform: "translateX(0%)" }}
            >
              <TestimonialsCard item={item} isCover={isCover} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${
              index === selectedIndex ? "w-8 bg-black" : "bg-[#D9D9D9]"
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
