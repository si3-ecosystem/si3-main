"use client";

import { Card } from "@/components/atoms/card";
import { Text } from "@/components/atoms/text";
import { ScholarsPartnerForm } from "@/components/molecules/forms/ScholarsPartnerForm";
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

export function Scholars({ data, showSvg = false }: Props) {
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
          "relative z-10 flex w-full flex-col gap-6 rounded-[30px] border border-[#9F44D3] bg-transparent p-[33px] pb-[18px] transition-all duration-300",
          activeSection === "scholars" && "!z-20 bg-white sm:!bg-white",
        )}
        onMouseEnter={() => handleSectionHover("scholars")}
      >
        <Image
          src={logoUrl || "/icons/jpg/si_u_scholars_heroimage.jpg"}
          fill
          loading="lazy"
          decoding="async"
          alt="scholars"
          className="h-full w-full object-contain object-right"
        />
        <div className="flex flex-col">
          <div className="mb-4 flex w-full items-center justify-between gap-4">
            <div>
              <Text as={"h2"} variant="2xl" className="!text-2xl font-semibold">
                {data.title}{" "}
                <span className="text-sm font-normal"> {data.membership}</span>
              </Text>
            </div>
          </div>
          <div className="mb-8 flex max-w-[235px] flex-col gap-2">
            <Text
              variant="xl"
              as={"p"}
              className="text-xl leading-7 font-normal tracking-tight text-[#121417]"
            >
              {data.description}
            </Text>
          </div>

          <ScholarsPartnerForm />
        </div>
      </Card>
      {showSvg && (
        <div className="z-20 flex items-center justify-center">
          {activeSection === "scholars" && (
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
