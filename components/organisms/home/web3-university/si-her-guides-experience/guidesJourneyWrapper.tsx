"use client";
import { GuidesData } from "@/types/home";
import HeroSection from "../HeroSection";
import { Web3Brand } from "../../guides/Web3Brand";
import { SpotlightSection } from "../../guides/SpotlightSection";
import { Programming } from "../../guides/Programming";
import { Testimonials } from "@/components/molecules/carousels/Testimonials";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { CircleArrowDown, CircleArrowUp } from "lucide-react";
import { Accordion, AccordionItem } from "@/components/atoms/accordion";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { setContentSection } from "@/redux/slice/activeSectionSlice";
import { Introduction } from "../Introduction";

export function GuidesJourneyWrapper({
  guidesData,
}: {
  guidesData: GuidesData;
}) {
  const dispatch = useDispatch();
  const [openSections, setOpenSections] = useState<string[]>(["hero"]);

  // Track content section changes
  useEffect(() => {
    const currentSection = openSections.length > 0 ? openSections[0] : null;
    dispatch(setContentSection(currentSection));
  }, [openSections, dispatch]);

  const sections = [
    {
      id: "hero",
      title: "GUIDES EXPERIENCE",
      content: () => (
        <div className="relative w-full overflow-hidden rounded-[30px] bg-[#FAF2FF] px-10 py-14 pb-8 max-lg:hidden">
          <motion.div
            initial={{ opacity: 0.9, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: 0.1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <HeroSection isGuides={true} data={guidesData.introduction} />
          </motion.div>
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
          <motion.div
            initial={{ opacity: 0.9, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: 0.1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <Introduction data={guidesData.introduction} />
          </motion.div>
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
          <motion.div
            initial={{ opacity: 0.9, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: 0.1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <Web3Brand data={guidesData.web3brands} />
          </motion.div>
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
          <motion.div
            initial={{ opacity: 0.9, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: 0.1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <SpotlightSection data={guidesData} />
          </motion.div>
        </div>
      ),
    },
    {
      id: "programming",
      title: "PROGRAMMING",
      content: (onClose: () => void) => (
        <div className="relative w-full rounded-[30px] border bg-white px-10 py-14 pb-8 max-lg:border-black max-lg:px-5">
          <CircleArrowUp
            size={48}
            onClick={onClose}
            strokeWidth={0.5}
            className="absolute top-5 right-5 z-10 cursor-pointer transition-transform duration-200 max-lg:size-[34px] lg:top-14 lg:right-14"
          />
          <motion.div
            initial={{ opacity: 0.9, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: 0.1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <Programming data={guidesData} />
          </motion.div>
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

          <motion.div
            initial={{ opacity: 0.9, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: 0.1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <Testimonials
              items={guidesData.testimonials}
              title="Si Her Testimonials"
            />
          </motion.div>
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
                    className="ml-4 shrink-0 cursor-pointer transition-transform duration-300 ease-in-out max-lg:size-[34px]"
                  />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionPrimitive.Content
                className="overflow-hidden"
                style={
                  {
                    "--radix-accordion-content-height":
                      "var(--radix-collapsible-content-height)",
                    "--radix-accordion-content-width":
                      "var(--radix-collapsible-content-width)",
                  } as React.CSSProperties
                }
              >
                <AnimatePresence mode="wait">
                  {openSections.includes(item.id) && (
                    <motion.div
                      key={item.id}
                      initial={{
                        height: 0,
                        opacity: 0,
                        clipPath: "inset(0 0 100% 0)",
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        clipPath: "inset(0 0 0% 0)",
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        clipPath: "inset(0 0 100% 0)",
                      }}
                      transition={{
                        duration: 1.0,
                        ease: [0.16, 1, 0.3, 1],
                        height: {
                          duration: 0.8,
                          ease: [0.16, 1, 0.3, 1],
                        },
                        clipPath: {
                          duration: 0.9,
                          ease: [0.16, 1, 0.3, 1],
                        },
                        opacity: {
                          duration: 0.6,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        initial={{ y: -20, opacity: 0, scale: 1 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        transition={{
                          delay: 0.3,
                          duration: 0.7,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="pb-4"
                      >
                        {item.content(() =>
                          setOpenSections((prev) =>
                            prev.filter((v) => v !== item.id),
                          ),
                        )}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </AccordionPrimitive.Content>
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
