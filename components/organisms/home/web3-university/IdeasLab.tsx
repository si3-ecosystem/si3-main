"use client";

import { Text } from "@/components/atoms/text";
import { Title } from "@/components/atoms/title";
import { DemoSessionCard } from "@/components/molecules/cards/DemoSessionCard";
import { ScholarsPartnerForm } from "@/components/molecules/forms/ScholarsPartnerForm";
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
      <div className="space-y-2">
        {title && (
          <Title
            variant="sm"
            className="mb-4 text-center !text-xl font-bold lg:mb-1 lg:text-start lg:!text-[45px]"
          >
            {title}
          </Title>
        )}
        {description && (
          <Text variant="xl" className="mb-8 max-w-[580px]">
            {description}
          </Text>
        )}
        <div className="max-lg:hidden">
          <ScholarsPartnerForm fill={true} />
        </div>
      </div>
      {data?.demoSessions && data.demoSessions.length > 0 && (
        <div className="mt-12 w-full">
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-4 max-sm:p-1">
                {(() => {
                  // Embla's loop requires at least 3 slides for this configuration to work reliably on all screen sizes.
                  const sessions =
                    data.demoSessions.length < 3
                      ? Array(Math.ceil(3 / data.demoSessions.length))
                          .fill(data.demoSessions)
                          .flat()
                      : data.demoSessions;

                  return sessions.map((session, index) => (
                    <div
                      key={`${session._key || "session"}-${index}`}
                      className="relative min-w-0 flex-[0_0_100%] md:flex-[0_0_calc(50%-.7rem)]"
                    >
                      <DemoSessionCard session={session} className="h-full" />
                    </div>
                  ));
                })()}
              </div>
            </div>
            <button
              onClick={scrollPrev}
              disabled={!emblaApi}
              className="absolute top-1/2 -left-6 z-10 -translate-y-1/2 rounded-full bg-gray-100 p-2 shadow-md transition hover:bg-gray-200 disabled:opacity-50"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={scrollNext}
              disabled={!emblaApi}
              className="absolute top-1/2 -right-6 z-10 -translate-y-1/2 rounded-full bg-gray-100 p-2 shadow-md transition hover:bg-gray-200 disabled:opacity-50"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
      <div className="mt-6 lg:hidden">
        <ScholarsPartnerForm fill={true} />
      </div>
    </div>
  );
}