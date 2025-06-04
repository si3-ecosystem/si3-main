"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Text } from "@/components/atoms/text";
import { Title } from "@/components/atoms/title";
import { Button } from "@/components/atoms/button";
import Link from "next/link";
import { Introduction } from "@/types/home";
import { PartnerProgramForm } from "@/components/molecules/forms/PartnerProgramForm";
import { DemoSessionCard } from "@/components/molecules/cards/DemoSessionCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HeroSection({
  data,
  isForm = false,
}: {
  data: Introduction;
  isForm?: boolean;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 2 },
    },
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
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
    <div>
      <div className="@container">
        <div className="flex flex-col gap-4 sm:gap-10 @3xl:flex-row @3xl:gap-[60px]">
          <div className="z-20 flex h-full w-full flex-1 flex-col justify-between gap-6 md:flex-row">
            <div className="space-y-2 lg:space-y-6">
              <Title className="!text-xl font-bold lg:!text-3xl lg:text-white">
                {data?.title}
              </Title>
              <Text className="w-fit rounded-[5px] bg-[#FCB0DE] px-4 py-1.5 text-[10px] font-medium text-black lg:px-6 lg:py-3">
                {data?.subtitle}
              </Text>
              <Text className="mt-6 max-w-[425px] text-xl font-medium max-lg:text-xs lg:mb-8 lg:leading-7 lg:text-white">
                {data?.description}
              </Text>
            </div>

            <div className="lg:mt-4 lg:mr-8">
              {isForm ? (
                <PartnerProgramForm
                  className="mx-auto text-white lg:w-[265px]"
                  title={data?.ctaText}
                />
              ) : (
                <Button
                  asChild
                  size={"md"}
                  className="mb-3 w-[125px] bg-black lg:w-[265px]"
                >
                  <Link href={data?.ctaLink}>{data?.ctaText}</Link>
                </Button>
              )}
              {data?.memberShip && (
                <Text className="text-sm text-[#BCBCBC] max-sm:my-2 max-sm:mb-6">
                  {data?.memberShip || "*$300 one-time membership fee"}
                </Text>
              )}
            </div>
          </div>
        </div>

        {data?.demoSessions && data.demoSessions.length > 0 && (
          <div className="mt-12 w-full">
            <div className="relative">
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-4 max-sm:p-1">
                  {data.demoSessions.map((session, index) => (
                    <div
                      key={session._key || index}
                      className="relative flex-[0_0_calc(100%-1rem)] md:flex-[0_0_calc(50%-0.5rem)]"
                    >
                      <DemoSessionCard session={session} className="h-full" />
                    </div>
                  ))}
                </div>
              </div>
              <>
                <button
                  onClick={scrollPrev}
                  disabled={!canScrollPrev}
                  className="absolute top-1/2 -left-6 z-10 -translate-y-1/2 rounded-full bg-gray-100 p-2 shadow-md transition hover:bg-gray-200 disabled:opacity-50"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={scrollNext}
                  disabled={!canScrollNext}
                  className="absolute top-1/2 -right-6 z-10 -translate-y-1/2 rounded-full bg-gray-100 p-2 shadow-md transition hover:bg-gray-200 disabled:opacity-50"
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
