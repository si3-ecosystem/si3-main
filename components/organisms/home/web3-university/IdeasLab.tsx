"use client";

import { Button } from "@/components/atoms/button";
import { Text } from "@/components/atoms/text";
import { Title } from "@/components/atoms/title";
import { DemoSessionCard } from "@/components/molecules/cards/DemoSessionCard";
import { ScholarsData } from "@/types/home";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, CircleArrowRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

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
        <Button
          asChild
          size={"md"}
          className="mb-3 flex !h-[34px] w-fit items-center gap-4 border border-black bg-black !px-[0ox] !py-[6px] !pr-[5px] !pl-[24px] text-sm font-normal text-black max-lg:hidden"
        >
          <Link href={"#"} className="flex items-center gap-4 text-white">
            <span>JOIN WAITLIST</span>{" "}
            <div className="flex shrink-0 items-center justify-center">
              <CircleArrowRight className="h-6 w-6 !shrink-0" />
            </div>
          </Link>
        </Button>
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

      <Button
        asChild
        size={"md"}
        className="mx-auto mt-8 mb-3 flex !h-[34px] w-fit items-center gap-4 border border-black bg-black !px-[0ox] !py-[6px] !pr-[5px] !pl-[24px] text-sm font-normal text-black lg:hidden"
      >
        <Link href={"#"} className="flex items-center gap-4 text-white">
          <span>JOIN WAITLIST</span>{" "}
          <div className="flex shrink-0 items-center justify-center">
            <CircleArrowRight className="h-6 w-6 !shrink-0" />
          </div>
        </Link>
      </Button>
    </div>
  );
}
