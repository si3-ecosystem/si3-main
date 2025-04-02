/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/atoms/accordion";
import { Title } from "@/components/atoms/title";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ReactNode, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useAppDispatch } from "@/redux/store";
import { setActiveAccordionValue } from "@/redux/slice/communitySlice";
import { PlusIcon, MinusIcon } from "lucide-react";
import { useWindowSize } from "@/hooks/useWindowsSize";

export interface AccordionRenderItem {
  title: string;
  value: string;
  sub?: string;
  section: ReactNode;
  background?: string;
}

export interface DynamicAccordionProps {
  renderItems: AccordionRenderItem[];
  defaultValue?: string;
}

export function CommunityAccordion({
  renderItems,
  defaultValue,
}: DynamicAccordionProps) {
  const dispatch = useAppDispatch();
  const { width } = useWindowSize();

  const sectionRef = useRef<HTMLDivElement>(null);

  const [openValues, setOpenValues] = useState<string[] | string>(
    defaultValue || renderItems[0]?.value || "",
  );

  const isMobile = width < 640;

  useEffect(() => {
    if (renderItems.length === 0) return;

    if (isMobile) {
      setOpenValues([]);
      dispatch(setActiveAccordionValue([]));
    } else if (defaultValue) {
      // On larger screens, use the provided defaultValue
      setOpenValues(defaultValue);
      dispatch(setActiveAccordionValue(defaultValue));
    }
  }, [isMobile, renderItems, defaultValue, dispatch]);

  const handleValueChange = (value: string | string[]) => {
    if (isMobile) {
      const newValues = Array.isArray(value)
        ? value
        : (openValues as string[]).includes(value)
          ? (openValues as string[]).filter((v) => v !== value)
          : [...(openValues as string[]), value];
      setOpenValues(newValues);
      dispatch(setActiveAccordionValue(newValues));
    } else {
      // For larger screens, handle single item
      const newValue = typeof value === "string" ? value : value[0] || "";
      setOpenValues(newValue);
      dispatch(setActiveAccordionValue(newValue));
    }

    if (sectionRef.current && !isMobile) {
      const sectionTop =
        sectionRef.current.getBoundingClientRect().top + window.scrollY;
      const offset = 50;
      window.scrollTo({
        top: sectionTop - offset,
        behavior: isMobile ? "auto" : "smooth", // Use "auto" on mobile, "smooth" on larger screens
      });
    }
  };

  // Helper to check if an item is open
  const isItemOpen = (value: string) => {
    return Array.isArray(openValues)
      ? openValues.includes(value)
      : openValues === value;
  };

  return (
    <div ref={sectionRef} className="space-y-4">
      <Accordion
        type={isMobile ? "multiple" : "single"}
        collapsible
        className="animate-out animate-in w-full"
        value={openValues}
        onValueChange={handleValueChange}
        defaultValue={
          isMobile
            ? [renderItems[0]?.value]
            : defaultValue || renderItems[0]?.value
        }
      >
        {renderItems.map((item) => (
          <AccordionItem
            value={item.value}
            key={item.value}
            className="mt-6 !overflow-hidden rounded-2xl !p-0 transition-all duration-300 ease-in-out sm:shadow-xl lg:rounded-lg [data-state=open]:z-40"
          >
            <AccordionPrimitive.Header className="group relative !z-20 flex !cursor-pointer py-[26px] lg:py-10">
              <AccordionPrimitive.Trigger className="focus-visible:ring-ring/50 focus-visible:border-ring flex flex-1 items-center justify-between overflow-hidden rounded-md px-4 py-2 text-left text-[15px] leading-6 font-semibold transition-all outline-none focus-visible:ring-[3px] lg:px-[90px] group-hover:[&>img]:scale-110">
                <Image
                  src={item.background || ""}
                  alt={item.title}
                  fill
                  objectFit="cover"
                  objectPosition="center"
                  className="z-0 w-full transition-transform duration-300 ease-in-out"
                />
                <span className="z-10 flex flex-col space-y-1">
                  <Title
                    as="h3"
                    variant="medium"
                    className="text-black uppercase"
                  >
                    {item.title}
                  </Title>
                </span>
                {isItemOpen(item.value) ? (
                  <MinusIcon className="pointer-events-none z-10 size-8 shrink-0 text-black lg:size-16" />
                ) : (
                  <PlusIcon className="pointer-events-none z-10 size-8 shrink-0 text-black lg:size-16" />
                )}
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionContent className="text-muted-foreground !z-10 !bg-white ease-in-out">
              {item.section}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
