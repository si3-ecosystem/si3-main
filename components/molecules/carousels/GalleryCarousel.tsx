"use client";

import React, { useEffect, useCallback, useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
// import { Button } from "@/components/atoms/button";
import { GalleryImage } from "@/types/home";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";
import { Button } from "@/components/atoms/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
      <div className="relative h-full sm:space-y-5">
        <div className="flex items-center justify-end gap-2 max-lg:hidden">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            className="rounded-full hover:!bg-black hover:text-white max-sm:hidden"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            className="rounded-full hover:!bg-black hover:text-white max-sm:hidden"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        <div className="h-full overflow-hidden" ref={emblaRef}>
          <div className="z-10 flex h-full w-full">
            {gallery.map((image, index) => {
              const imageUrl = image.asset && urlForImage(image)?.src;
              return (
                <div
                  key={index}
                  className="h-full w-full min-w-0 flex-[0_0_100%]"
                >
                  <div className="relative min-h-[350px] w-full sm:min-h-[400px]">
                    <Image
                      src={
                        imageUrl || "/icons/jpg/si_u_scholars_galleryimage.jpg"
                      }
                      alt={image.alt || "Gallery image"}
                      fill
                      className="!aspect-video w-full rounded-lg object-contain object-bottom sm:object-top"
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
      </div>
      <div className="z-20 mx-auto mt-8 flex w-full justify-center gap-2 !pt-6 sm:-bottom-0">
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
