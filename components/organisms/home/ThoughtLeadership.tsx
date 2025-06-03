"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ThoughtLeadership } from "@/types/home";
import Image from "next/image";
// import Link from "next/link";
import { urlForImage } from "@/lib/sanity/image";
// import { Button } from "@/components/atoms/button";

const options = {
  loop: true,
  align: "start",
  containScroll: "trimSnaps",
};

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

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (!thoughtLeadership?.length) return null;

  return (
    <div className="relative h-[248px] w-full overflow-hidden rounded-[30px] md:h-[479px]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 h-full w-full">
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
            priority
          />
        )}
      </div>

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex-1 overflow-hidden" ref={emblaRef}>
          <div className="mx-auto flex h-full gap-6">
            {thoughtLeadership.map((item) => (
              <div
                key={item._id}
                className="relative flex h-fit w-full flex-shrink-0 flex-col justify-between text-white lg:flex-row lg:p-6 lg:pl-6"
              >
                <div className="flex w-full items-center justify-between bg-black/40 p-6 max-lg:mt-7 lg:rounded-[10px]">
                  <h3 className="text-xl font-semibold max-lg:text-center">
                    {item.title}
                  </h3>
                  {/* <div className="flex gap-4 max-lg:hidden">
                    {item.cta1Text && (
                      <Button className="bg-[#9F44D3] text-white">
                        <Link href={item.cta1Link || "#"}>{item.cta1Text}</Link>
                      </Button>
                    )}
                    {item.cta2Text && (
                      <Button className="bg-black text-white">
                        <Link href={item.cta2Link || "#"}>{item.cta2Text}</Link>
                      </Button>
                    )}
                  </div> */}
                </div>

                {/* <div className="mt-12 flex hidden w-full items-center justify-center gap-2.5">
                  {item.cta1Text && (
                    <Button className="w-[124px] bg-[#9F44D3] text-white">
                      <Link href={item.cta1Link || "#"}>{item.cta1Text}</Link>
                    </Button>
                  )}
                  {item.cta2Text && (
                    <Button className="w-[124px] bg-black text-white">
                      <Link href={item.cta2Link || "#"}>{item.cta2Text}</Link>
                    </Button>
                  )}
                </div> */}
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
