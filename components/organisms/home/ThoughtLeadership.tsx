"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ThoughtLeadership } from "@/types/home";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";
import { cn } from "@/lib/utils";

const options = {
  loop: true,
  align: "start",
  containScroll: "trimSnaps",
};

const AUTO_SCROLL_DELAY = 3000;

export function ThoughtLeadershipSection({
  thoughtLeadership,
}: {
  thoughtLeadership: ThoughtLeadership[];
}) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on("select", onSelect);

    const autoScroll = setInterval(() => {
      scrollNext();
    }, AUTO_SCROLL_DELAY);

    return () => {
      emblaApi.off("select", onSelect);
      clearInterval(autoScroll);
    };
  }, [emblaApi, onSelect, scrollNext]);

  if (!thoughtLeadership?.length) return null;

  return (
    <div className="relative h-[458px] w-full overflow-hidden rounded-[30px] bg-black/40 md:h-[479px]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 h-full w-full max-lg:hidden">
        {thoughtLeadership[selectedIndex].backgroundImage && (
          <Image
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //   @ts-ignore
            src={
              urlForImage(thoughtLeadership[selectedIndex].backgroundImage)?.src
            }
            alt={thoughtLeadership[selectedIndex].backgroundImage.alt || ""}
            fill
            className="object-cover"
          />
        )}
      </div>
      <div className="absolute inset-0 z-0 hidden h-full w-full max-lg:block">
        {thoughtLeadership[selectedIndex].backgroundImageMobile && (
          <Image
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //   @ts-ignore
            src={
              urlForImage(
                thoughtLeadership[selectedIndex].backgroundImageMobile,
              )?.src
            }
            alt={
              thoughtLeadership[selectedIndex].backgroundImageMobile.alt || ""
            }
            fill
            className="object-cover"
          />
        )}
      </div>

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex-1 overflow-hidden" ref={emblaRef}>
          <div className="mx-auto flex h-full gap-6">
            {thoughtLeadership.map((item, index) => (
              <div
                key={item._id}
                className="relative flex h-fit w-full flex-shrink-0 flex-col justify-between text-white lg:flex-row lg:items-start lg:p-6 lg:pl-6"
              >
                <div
                  className={cn(
                    "flex w-full items-center justify-between p-6 max-lg:mt-7 max-lg:hidden lg:rounded-[10px]",
                    index !== 0 && "hidden",
                    selectedIndex === 0 && "bg-black/40",
                  )}
                >
                  <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-semibold max-lg:text-center">
                      {item.title}
                    </h3>
                    {item.desc && (
                      <p className="w-full max-w-[600px] text-sm max-lg:text-center">
                        {item.desc}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 pb-6">
          {thoughtLeadership.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                index === selectedIndex
                  ? "w-[78px] bg-black"
                  : "w-[78px] bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
