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
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";
import { SiHerGuidesForm } from "@/components/molecules/forms/siHerGuidesForm";
import { ScholarsPartnerForm } from "@/components/molecules/forms/ScholarsPartnerForm";

export default function HeroSection({
  data,
  isForm = false,
  hideButton = false,
  isGuides = false,
}: {
  data: Introduction;
  isForm?: boolean;
  hideButton?: boolean;
  isGuides?: boolean;
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
      <div className="@container overflow-hidden">
        <Image
          src={urlForImage(data.thumbnail)?.src || ""}
          alt={data.title}
          fill
          className="h-full w-full object-contain object-right"
        />
        <div className="flex flex-col gap-4 sm:gap-10 @3xl:flex-row @3xl:gap-[60px]">
          <div className="relative z-20 flex h-full w-full flex-1 flex-col justify-between gap-5">
            <div className="">
              <Title className="!text-xl font-bold lg:!text-[45px]">
                {data?.title}
              </Title>
              <Text className="text-[35px] !leading-[125%]">
                {data?.subtitle}
              </Text>
              <Text className="mt-6 max-w-[425px] text-xl font-medium max-lg:text-xs lg:mb-8 lg:leading-7">
                {data?.description}
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
              {isForm ? (
                <PartnerProgramForm
                  className="mx-auto lg:w-[265px]"
                  title={data?.ctaText}
                />
              ) : isGuides ? (
                <SiHerGuidesForm title={data?.ctaText} className="" />
              ) : (
                <ScholarsPartnerForm />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
