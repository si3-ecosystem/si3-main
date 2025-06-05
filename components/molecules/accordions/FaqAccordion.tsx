"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/atoms/accordion";
import { Title } from "@/components/atoms/title";
import { useWindowSize } from "@/hooks/useWindowsSize";
import { PortableText } from "@portabletext/react";
import React, { useState } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { MinusIcon, PlusIcon } from "lucide-react";
import { FAQ } from "@/types/home";

type FaqAccordionProps = {
  faqs: FAQ[];
};

export function FaqAccordion({ faqs }: FaqAccordionProps) {
  const { width } = useWindowSize();
  const isMobile = width < 640;
  const [openValues, setOpenValues] = useState<string | string[]>(
    isMobile ? [] : "",
  );

  const handleValueChange = (value: string | string[]) => {
    setOpenValues(value);
  };

  const isItemOpen = (_key: string) => {
    return isMobile
      ? (openValues as string[]).includes(_key)
      : openValues === _key;
  };

  if (!faqs || faqs.length === 0) {
    return <div>No FAQs available</div>;
  }

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Accordion
      type={isMobile ? "multiple" : "single"}
      collapsible
      className="animate-out animate-in w-full overflow-hidden border-none bg-transparent shadow-none max-md:px-4"
      value={openValues}
      defaultValue={isMobile ? [faqs[0]?._key] : faqs[0]?._key}
      onValueChange={handleValueChange}
    >
      {faqs.map((faq) => (
        <AccordionItem
          value={faq._key}
          key={faq._key}
          className="mt-6 !overflow-hidden rounded-2xl bg-[#8f75b1] !p-0 transition-all duration-300 ease-in-out data-[state=open]:bg-[#9F44D3] lg:rounded-lg [data-state=open]:z-40"
        >
          <AccordionPrimitive.Header className="group relative !z-20 flex !cursor-pointer py-[10px] lg:py-10">
            <AccordionPrimitive.Trigger className="focus-visible:ring-ring/50 focus-visible:border-ring flex flex-1 items-center justify-between overflow-hidden rounded-md px-4 py-2 text-left text-[15px] leading-6 font-semibold transition-all outline-none focus-visible:ring-[3px] lg:px-[90px] group-hover:[&>img]:scale-110">
              <span className="z-10 flex flex-col space-y-1">
                <Title
                  as="h3"
                  variant="medium"
                  className="font-clesmont text-xs leading-[140%] text-black uppercase lg:text-[25px]"
                >
                  {faq.question}
                </Title>
              </span>
              {isItemOpen(faq._key) ? (
                <MinusIcon className="pointer-events-none z-10 size-8 shrink-0 text-black lg:size-16" />
              ) : (
                <PlusIcon className="pointer-events-none z-10 size-8 shrink-0 text-black lg:size-16" />
              )}
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionContent className="text-muted-foreground !z-10 !bg-[#9F44D3] ease-in-out">
            <div className="prose px-4 pb-4 text-sm text-[#070707] lg:px-[90px] lg:pb-6 lg:text-xl">
              <PortableText value={faq.answer} />
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
