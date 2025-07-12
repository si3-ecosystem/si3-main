"use client";

import { Text } from "@/components/atoms/text";
import { Title } from "@/components/atoms/title";
import { DemoSessionCard } from "@/components/molecules/cards/DemoSessionCard";
import { ScholarsPartnerForm } from "@/components/molecules/forms/ScholarsPartnerForm";
import { cn } from "@/lib/utils";
import { ScholarsData } from "@/types/home";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback } from "react";

export function IdeasLab({
  title,
  description,
  data,
}: {
  title: string;
  description: string;
  data: ScholarsData;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    dragFree: true,
    containScroll: "trimSnaps",
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 2 },
    },
  });

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );

  return (
    <div>
      <div className="@container h-full">
        <div className="flex flex-col gap-4 sm:gap-10 @3xl:flex-row @3xl:gap-[60px]">
          <div className="relative z-20 flex h-full w-full flex-1 flex-col justify-between gap-5">
            <div className="">
              <Title className="!text-xl font-bold max-lg:mb-4 max-lg:text-center lg:!text-[45px]">
                {title}
              </Title>
              <Text className="max-w-[425px] text-xl font-medium max-lg:text-xs lg:mb-8 lg:leading-7">
                {description}
              </Text>
            </div>

            <div className={cn("space-y-6 lg:mr-8")}>
              <div className="max-lg:hidden">
                <ScholarsPartnerForm fill={true} />
              </div>
            </div>
          </div>
        </div>

        <div>
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
                    className="absolute top-1/2 -left-6 z-10 -translate-y-1/2 rounded-full bg-gray-100 p-2 shadow-md transition hover:bg-gray-200 disabled:opacity-50"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={scrollNext}
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
      <div className="mt-6 lg:hidden">
        <ScholarsPartnerForm fill={true} />
      </div>
    </div>
  );
}
