"use client";

import React, { useEffect, useCallback, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/atoms/button";
import { TestimonialsCard } from "../cards/TestimonialsCard";

export interface Testimonial {
  id: string;
  image: string;
  quote: string;
  author: string;
  role: string;
  companyName: string;
  companyLogo: string;
}

interface TestimonialsProps {
  title: string;
  items: Testimonial[];
}

const options = {
  loop: true,
  align: "center",
  containScroll: "trimSnaps",
};

export function Testimonials({ title, items }: TestimonialsProps) {
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
    <div className="mx-auto w-full">
      <div className="mb-12 flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-black">
          {title}
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            className="rounded-full hover:!bg-[#f4f1ff] hover:text-black"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            className="rounded-full hover:!bg-[#f4f1ff] hover:text-black"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="@container flex w-full">
          {items.map((item, index) => (
            <div
              key={index}
              className="w-full min-w-0 flex-[0_0_100%]"
              style={{ transform: "translateX(0%)" }}
            >
              <TestimonialsCard item={item} />
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
