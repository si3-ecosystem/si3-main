"use client";

import { Text } from "@/components/atoms/text";
import { Title } from "@/components/atoms/title";
import { Introduction } from "@/types/home";
import { PartnerProgramForm } from "@/components/molecules/forms/PartnerProgramForm";
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
