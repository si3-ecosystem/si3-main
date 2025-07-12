"use client";
import { Course, ScholarsData } from "@/types/home";
import HeroSection from "../HeroSection";
import { SiHerKollab } from "../../scholars/SiHerKollab";
import { IdeasLab } from "../IdeasLab";
import { VideoCarousel } from "@/components/molecules/carousels/videoCarousel";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { CircleArrowDown, CircleArrowUp } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/atoms/accordion";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setContentSection } from "@/redux/slice/activeSectionSlice";
import { usePlausible } from "next-plausible";

export function ScholarsJourneyWrapper({
  scholarsData,
}: {
  scholarsData: ScholarsData;
}) {
  const dispatch = useDispatch();
  const plausible = usePlausible();
  const [openSections, setOpenSections] = useState<string[]>(["journey"]);

  // Track content section changes
  useEffect(() => {
    const currentSection = openSections.length > 0 ? openSections[0] : null;
    dispatch(setContentSection(currentSection));

    if (currentSection) {
      plausible("Section Click", {
        props: {
          path: "scholars",
          section: currentSection,
        },
      });
    }
  }, [openSections, dispatch, plausible]);

  const handleClose = (id: string) => {
    setOpenSections((prev) => prev.filter((item) => item !== id));
  };

  const sections = [
    {
      id: "journey",
      title: "SCHOLARS JOURNEY",
      subtitle: "FREE WEB3 EDUCATION",
      content: (onClose: () => void) => (
        <div className="relative w-full overflow-hidden rounded-[30px] border bg-[#FAF2FF] px-10 py-14 pb-8 max-lg:hidden max-lg:border-black">
          <CircleArrowUp
            size={48}
            onClick={onClose}
            strokeWidth={0.5}
            className="absolute top-5 right-5 z-10 cursor-pointer transition-transform duration-200 max-lg:size-[34px] lg:hidden"
          />
          <HeroSection data={scholarsData.introduction} />
        </div>
      ),
    },
    {
      id: "sessions",
      title: "SESSIONS",
      content: (onClose: () => void) => (
        <div className="relative w-full rounded-[30px] border bg-white px-5 py-6 pb-8 transition-all duration-300 ease-in-out max-lg:border-black lg:px-10 lg:py-14">
          <CircleArrowUp
            size={48}
            onClick={onClose}
            strokeWidth={0.5}
            className="absolute top-5 right-5 z-10 cursor-pointer transition-transform duration-200 max-lg:size-[34px] lg:top-14 lg:right-14"
          />
          <VideoCarousel
            autoplay={true}
            autoplayInterval={3500}
            joinWaitlist={true}
            title={scholarsData?.education_title || "SI U Education"}
            description={
              scholarsData?.education_description ||
              "Discover leading-edge insights and education in our free and open university."
            }
            itemsPerSlide={6}
            items={scholarsData.courses}
          />
        </div>
      ),
    },
    {
      id: "communities",
      title: "COMMUNITIES",
      content: (onClose: () => void) => (
        <div className="relative w-full rounded-[30px] border bg-white px-5 py-6 pb-8 max-lg:border-black lg:px-10 lg:py-14">
          <CircleArrowUp
            size={48}
            onClick={onClose}
            strokeWidth={0.5}
            className="absolute top-5 right-5 z-10 cursor-pointer transition-transform duration-200 max-lg:size-[34px] lg:top-14 lg:right-14"
          />
          <SiHerKollab joinWaitlist={true} data={scholarsData} />
        </div>
      ),
    },
    {
      id: "ideas-lab",
      title: "IDEAS LAB",
      content: (onClose: () => void) => (
        <div className="relative w-full rounded-[30px] border bg-white px-5 py-6 pb-8 max-lg:border-black lg:px-10 lg:py-14">
          <CircleArrowUp
            size={48}
            onClick={onClose}
            strokeWidth={0.5}
            className="absolute top-5 right-5 z-30 cursor-pointer transition-transform duration-200 max-lg:size-[34px] lg:top-14 lg:right-14"
          />
          <IdeasLab
            data={scholarsData}
            title={scholarsData.ideas_title}
            description={scholarsData.ideas_description}
          />
        </div>
      ),
    },
  ];

  return (
    <div id="scholars" className="space-y-4 pb-16">
      <Accordion
        type="multiple"
        value={openSections}
        onValueChange={setOpenSections}
        className="w-full space-y-4"
      >
        {sections.map((item) => (
          <AccordionItem
            value={item.id}
            key={item.id}
            className="rounded-lg p-0.5"
          >
            <div className="rounded-[7px]">
              <AccordionPrimitive.Header className="flex rounded-[10px] bg-white lg:rounded-[30px]">
                <AccordionPrimitive.Trigger
                  className={cn(
                    "font-clesmont flex w-full flex-1 cursor-pointer items-center justify-between rounded-[10px] border-black px-[46px] py-[21px] text-left text-[20px] leading-[125%] font-normal text-black transition-all outline-none focus-visible:ring-0 data-[state=open]:hidden max-lg:border max-lg:pr-[27px] lg:rounded-[30px] lg:bg-[#D199F482] lg:px-[58px] lg:py-[38px] lg:text-[45px]",
                    "[&[data-state=open]>svg]:rotate-45",
                  )}
                >
                  {item.title}

                  <CircleArrowDown
                    size={48}
                    strokeWidth={0.5}
                    className="ml-4 shrink-0 cursor-pointer transition-transform duration-200 max-lg:size-[34px]"
                  />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden transition-all">
                <div className="pb-4">
                  {openSections.includes(item.id) &&
                    item.content(() => handleClose(item.id))}
                </div>
              </AccordionContent>
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
