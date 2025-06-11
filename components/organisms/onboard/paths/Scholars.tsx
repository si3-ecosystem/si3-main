"use client";

import { AspectRatio } from "@/components/atoms/aspect-ratio";
import { Button } from "@/components/atoms/button";
import { Card } from "@/components/atoms/card";
import { Text } from "@/components/atoms/text";
import { urlForImage } from "@/lib/sanity/image";
import { cn } from "@/lib/utils";
import { setActiveSection } from "@/redux/slice/activeSectionSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { OnboardMaterial } from "@/types/onboard";
import Image from "next/image";
import Link from "next/link";

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
    <div id="scholars">
      <Card
        className={cn(
          "z-10 flex w-full flex-col gap-6 rounded-[33px] border bg-transparent p-4 transition-all duration-300",
          activeSection === "scholars" &&
            "card-gradient !z-20 !bg-[#7b43b0] sm:!bg-white",
        )}
        onMouseEnter={() => handleSectionHover("scholars")}
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
                className="text-2xl font-semibold text-white sm:text-black"
              >
                {data.title}
              </Text>
              <Text className="!text-sm leading-5 text-black max-sm:mt-3.5 sm:text-[#616060]">
                {data.subtitle}
              </Text>
            </div>
          </div>
          <div className="mb-8 flex flex-col gap-2">
            <Text
              variant="xl"
              as={"p"}
              className="text-xl leading-7 font-normal tracking-tight text-[#D9D9D9] sm:text-[#3D3D3D]"
            >
              {data.description}
            </Text>
            <Text
              variant="base"
              as={"p"}
              className="text-left text-black max-sm:mt-3.5 sm:text-[#585858]"
            >
              {data.membership}
            </Text>
          </div>
          <Button
            asChild
            disabled
            variant={"outline"}
            className="w-full border border-black text-center max-sm:bg-black max-sm:text-white"
          >
            <Link href={"#"}>{"COMING SOON"}</Link>
          </Button>
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
