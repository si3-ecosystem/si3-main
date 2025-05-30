"use client";

import { AspectRatio } from "@/components/atoms/aspect-ratio";
import { Card } from "@/components/atoms/card";
import { Text } from "@/components/atoms/text";
import { PartnerProgramForm } from "@/components/molecules/forms/PartnerProgramForm";
import { urlForImage } from "@/lib/sanity/image";
import { cn } from "@/lib/utils";
import { setActiveSection } from "@/redux/slice/activeSectionSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { OnboardMaterial } from "@/types/onboard";
import Image from "next/image";

type Props = {
  data: OnboardMaterial;
  showSvg?: boolean;
};

export function Partners({ data, showSvg = false }: Props) {
  const logoUrl = data?.image && urlForImage(data.image)?.src;

  const dispatch = useAppDispatch();

  const activeSection = useAppSelector(
    (state) => state.activeSection.activeSection,
  );

  const handleSectionHover = (section: "scholars" | "guides" | "partners") => {
    dispatch(setActiveSection(section));
  };

  return (
    <div>
      <Card
        className={cn(
          "z-10 flex w-full flex-col gap-6 rounded-[33px] border bg-transparent p-5 transition-all duration-300",
          activeSection === "partners"
            ? "card-gradient !z-20 !bg-[#7b43b0] sm:!bg-white"
            : "border-[#D1D1D1]",
        )}
        onMouseEnter={() => handleSectionHover("partners")}
      >
        <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-2xl">
          <Image
            src={logoUrl || "/icons/jpg/si_u_scholars_heroimage.jpg"}
            fill
            {...(data?.thumbnail?.blurDataURL && {
              placeholder: "blur",
              blurDataURL: data?.thumbnail?.blurDataURL,
            })}
            loading="lazy"
            decoding="async"
            alt="scholars"
            className="h-full w-full object-contain"
          />
        </AspectRatio>
        <div className="flex flex-col gap-6">
          <div className="flex w-full items-center justify-between gap-4">
            <div>
              <Text
                as={"h2"}
                variant="2xl"
                className="text-2xl font-semibold text-black max-sm:text-white"
              >
                {data.title}
              </Text>
              <Text className="!text-sm leading-5 text-black max-sm:mt-3.5 sm:text-[#616060]">
                {data.subtitle}
              </Text>
            </div>
          </div>
          <Text
            variant="xl"
            as={"p"}
            className="mb-16 tracking-tight max-sm:text-[#D9D9D9]"
          >
            {data.description}
          </Text>
          <PartnerProgramForm
            showGradient
            className="w-full text-black max-sm:bg-black max-sm:text-white"
          />
        </div>
      </Card>
      {showSvg && (
        <div className="flex items-center justify-center">
          {activeSection === "partners" && (
            <>
              <Image
                src={"/home/Conector.svg"}
                alt="connector"
                width={16}
                height={127}
                className="bg-transparent"
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}
