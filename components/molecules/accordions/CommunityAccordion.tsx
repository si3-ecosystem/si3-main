"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/atoms/accordion";
import { Title } from "@/components/atoms/title";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ReactNode, useEffect, useRef } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setActiveAccordionValue } from "@/redux/slice/communitySlice";
import { PlusIcon, MinusIcon } from "lucide-react";

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
  const activeAccordionValue = useAppSelector(
    (state) => state.community.activeAccordionValue,
  );

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activeAccordionValue && defaultValue) {
      dispatch(setActiveAccordionValue(defaultValue));
    }
  }, [activeAccordionValue, defaultValue, dispatch]);

  const handleValueChange = (value: string) => {
    dispatch(setActiveAccordionValue(value));

    if (sectionRef.current) {
      const sectionTop =
        sectionRef.current.getBoundingClientRect().top + window.scrollY;
      const offset = 50;
      window.scrollTo({
        top: sectionTop - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <div ref={sectionRef} className="space-y-4">
      <Accordion
        type="single"
        collapsible
        className="animate-out animate-in w-full"
        value={activeAccordionValue}
        onValueChange={handleValueChange}
        defaultValue={defaultValue || renderItems[0]?.value}
      >
        {renderItems.map((item) => (
          <AccordionItem
            value={item.value}
            key={item.value}
            className="-mt-8 !overflow-hidden rounded-2xl !p-0 transition-all duration-300 ease-in-out sm:shadow-xl md:-mt-16 lg:rounded-[40px] [data-state=open]:z-40 [data-state=open]:mt-8 md:[data-state=open]:mt-16"
          >
            <AccordionPrimitive.Header className="group relative !z-20 flex !cursor-pointer py-[30px] lg:py-14">
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
                    className="text-white uppercase"
                  >
                    {item.title}
                  </Title>
                </span>
                {activeAccordionValue === item.value ? (
                  <MinusIcon className="pointer-events-none z-10 size-8 shrink-0 text-white lg:size-16" />
                ) : (
                  <PlusIcon className="pointer-events-none z-10 size-8 shrink-0 text-white lg:size-16" />
                )}
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionContent className="text-muted-foreground !z-0 bg-white ease-in-out">
              {item.section}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
