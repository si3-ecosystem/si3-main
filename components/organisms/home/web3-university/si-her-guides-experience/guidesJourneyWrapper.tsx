"use client";
import { GuidesData } from "@/types/home";
import HeroSection from "../HeroSection";
import { Web3Brand } from "../../guides/Web3Brand";
import { SpotlightSection } from "../../guides/SpotlightSection";
import { Programming } from "../../guides/Programming";
import { Testimonials } from "@/components/molecules/carousels/Testimonials";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { CircleArrowDown, CircleArrowUp } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/atoms/accordion";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Introduction } from "../Introduction";

export function GuidesJourneyWrapper({
  guidesData,
}: {
  guidesData: GuidesData;
}) {
  const [openSections, setOpenSections] = useState<string[]>(["hero"]);

  const sections = [
    {
      id: "hero",
      title: "GUIDES EXPERIENCE",
      content: () => (
        <div className="relative w-full overflow-hidden rounded-[30px] bg-[#FAF2FF] px-10 py-14 pb-8 max-lg:hidden">
          <HeroSection isGuides={true} data={guidesData.introduction} />
        </div>
      ),
    },

    {
      id: "si-her-dao",
      title: "SI HER DAO",
      content: (onClose: () => void) => (
        <div className="relative w-full overflow-hidden rounded-[30px] border bg-white px-10 py-14 pb-8 max-lg:border-black max-lg:px-5 max-lg:py-6">
          <CircleArrowUp
            size={48}
            onClick={onClose}
            strokeWidth={0.5}
            className="absolute top-5 right-5 z-30 cursor-pointer transition-transform duration-200 max-lg:size-[34px] lg:top-14 lg:right-14"
          />
          <Introduction data={guidesData.introduction} />
        </div>
      ),
    },
    {
      id: "web3brand",
      title: "PERSONAL WEB3 BRAND",
      content: (onClose: () => void) => (
        <div className="relative w-full rounded-[30px] border bg-white px-10 py-14 pb-8 max-lg:border-black max-lg:px-5 max-lg:py-6">
          <CircleArrowUp
            size={48}
            onClick={onClose}
            strokeWidth={0.5}
            className="absolute top-5 right-5 z-10 cursor-pointer transition-transform duration-200 max-lg:size-[34px] lg:top-14 lg:right-14"
          />
          <Web3Brand data={guidesData.web3brands} />
        </div>
      ),
    },
    {
      id: "spotlight",
      title: "MEMBER SPOTLIGHT",
      content: (onClose: () => void) => (
        <div className="relative w-full rounded-[30px] border bg-white px-10 py-14 pb-8 max-lg:border-black max-lg:px-5">
          <CircleArrowUp
            size={48}
            onClick={onClose}
            strokeWidth={0.5}
            className="absolute top-5 right-5 z-10 cursor-pointer transition-transform duration-200 max-lg:size-[34px] lg:top-14 lg:right-14"
          />
          <SpotlightSection data={guidesData} />
        </div>
      ),
    },
    {
      id: "programming",
      title: "SI HER SESSIONS",
      content: (onClose: () => void) => (
        <div className="relative w-full rounded-[30px] border bg-white px-10 py-14 pb-8 max-lg:border-black max-lg:px-5">
          <CircleArrowUp
            size={48}
            onClick={onClose}
            strokeWidth={0.5}
            className="absolute top-5 right-5 z-10 cursor-pointer transition-transform duration-200 max-lg:size-[34px] lg:top-14 lg:right-14"
          />
          <Programming data={guidesData} />
        </div>
      ),
    },
    {
      id: "testimonials",
      title: "TESTIMONIALS",
      content: (onClose: () => void) => (
        <div className="relative w-full rounded-[30px] border bg-white px-10 py-14 pb-8 max-lg:border-black max-lg:px-5 max-lg:py-6">
          <CircleArrowUp
            size={48}
            onClick={onClose}
            strokeWidth={0.5}
            className="absolute top-5 right-5 z-10 cursor-pointer transition-transform duration-200 max-lg:size-[34px] lg:top-14 lg:right-14"
          />
          <Testimonials
            items={guidesData.testimonials}
            isCover={true}
            title="Si Her Testimonials"
          />
        </div>
      ),
    },
  ];

  return (
    <div id="guides" className="space-y-4 pb-16">
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
                    "font-clesmont flex w-full flex-1 cursor-pointer items-center justify-between rounded-[10px] border-black px-[46px] py-[21px] text-left text-[20px] leading-[125%] !font-normal text-black transition-all outline-none focus-visible:ring-0 data-[state=open]:hidden max-lg:border max-lg:pr-[27px] lg:rounded-[30px] lg:bg-[#D199F482] lg:px-[58px] lg:py-[38px] lg:text-[45px]",
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
                    item.content(() =>
                      setOpenSections((prev) =>
                        prev.filter((v) => v !== item.id),
                      ),
                    )}
                </div>
              </AccordionContent>
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
