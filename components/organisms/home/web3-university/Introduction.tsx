"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Text } from "@/components/atoms/text";
import { Title } from "@/components/atoms/title";
import { DemoSessionCard } from "@/components/molecules/cards/DemoSessionCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Introduction as typeIntroduction } from "@/types/home";
import { SiHerGuidesForm } from "@/components/molecules/forms/siHerGuidesForm";

export function Introduction({
  data,
  hideButton = false,
}: {
  data: typeIntroduction;
  hideButton?: boolean;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
    loop: true,
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
      <div className="@container h-full">
        <div className="flex flex-col gap-4 sm:gap-10 @3xl:flex-row @3xl:gap-[60px]">
          <div className="relative z-20 flex h-full w-full flex-1 flex-col justify-between gap-5">
            <div className="">
              <Title className="!text-xl font-bold max-lg:mb-4 max-lg:text-center lg:!text-[45px]">
                SI HER DAO
              </Title>
              <Text className="max-w-[425px] text-xl font-medium max-lg:text-xs lg:mb-8 lg:leading-7">
                Apply to join our developing DAO comprised of 35 and growing
                women in Web3 community leaders, and the brightest professionals
                in the industry.
              </Text>
            </div>

            <div
              className={cn(
                "space-y-6 lg:mr-8",
                !hideButton && "max-md:hidden",
              )}
            >
              {data?.memberShip && (
                <Text className="text-sm text-[#BCBCBC] max-sm:my-2 max-sm:mb-6">
                  {data?.memberShip || "*$300 one-time membership fee"}
                </Text>
              )}

              <div className="max-lg:hidden">
                <SiHerGuidesForm
                  title={data?.ctaText}
                  className=""
                  fill={true}
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          {data?.demoSessions && data.demoSessions.length > 0 && (
            <div className="mt-12 w-full">
              <div className="relative">
                <div className="overflow-hidden" ref={emblaRef}>
                  <div className="flex gap-5 sm:gap-4">
                    {data.demoSessions.map((session, index) => (
                      <div
                        key={session._key || index}
                        className={cn(
                          "relative flex-[0_0_calc(100%-1rem)] md:flex-[0_0_calc(50%-0.5rem)]",
                          index % 2 === 0
                            ? "sm:ml-1 sm:pl-4"
                            : "sm:mr-1 sm:pr-4",
                          "max-sm:ml-2",
                        )}
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
      <div className="mt-6 block lg:hidden">
        <SiHerGuidesForm title={data?.ctaText} className="" fill={true} />
      </div>
    </div>
  );
}
