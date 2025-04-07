"use client";

import React, { useEffect, useCallback, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/atoms/button";
import { GalleryImage } from "@/types/home";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";

interface GalleryCarouselProps {
  gallery: GalleryImage[];
}

const options = {
  loop: false,
  align: "center",
  containScroll: "trimSnaps",
};

export function GalleryCarousel({ gallery }: GalleryCarouselProps) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = () => {
    if (emblaApi) emblaApi.scrollPrev();
  };

  const scrollNext = () => {
    if (emblaApi) emblaApi.scrollNext();
  };

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
    <div className="relative mx-auto h-full w-full">
      <div className="relative h-full">
        <Button
          variant="outline"
          size="icon"
          onClick={scrollPrev}
          className="absolute top-1/2 left-0 z-10 -translate-y-1/2 rounded-full hover:!bg-black hover:text-white max-sm:hidden"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <div className="h-full overflow-hidden" ref={emblaRef}>
          <div className="-ml-4 flex h-full w-full">
            {gallery.map((image, index) => {
              const imageUrl = image.asset && urlForImage(image)?.src;
              return (
                <div
                  key={index}
                  className="h-full w-full min-w-0 flex-[0_0_100%] pl-4"
                >
                  <div className="relative h-[400px] w-full">
                    <Image
                      src={
                        imageUrl || "/icons/jpg/si_u_scholars_galleryimage.jpg"
                      }
                      alt={image.alt || "Gallery image"}
                      fill
                      className="rounded-lg"
                      placeholder={image.blurDataURL ? "blur" : "empty"}
                      blurDataURL={image.blurDataURL}
                    />
                    {image.caption && (
                      <p className="absolute bottom-2 left-2 rounded bg-black/50 px-2 py-1 text-white">
                        {image.caption}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={scrollNext}
          className="absolute top-1/2 right-0 z-10 -translate-y-1/2 rounded-full hover:!bg-black hover:text-white max-sm:hidden"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {gallery.map((_, index) => (
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
