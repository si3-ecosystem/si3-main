import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/atoms/accordion";
import { Title } from "@/components/atoms/title";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

import { ReactNode } from "react";
import { AccordionDownIcon } from "../icons/AccordionDownIcon";
import Image from "next/image";

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
  return (
    <div className="space-y-4">
      <Accordion
        type="single"
        collapsible
        className="animate-out animate-in w-full ease-in-out"
        defaultValue={defaultValue || renderItems[0]?.value}
      >
        {renderItems.map((item) => (
          <AccordionItem
            value={item.value}
            key={item.value}
            className="-mt-8 !overflow-hidden rounded-2xl !p-0 shadow-xl transition-all duration-300 ease-in-out md:-mt-16 lg:rounded-[40px] [data-state=open]:z-40 [data-state=open]:mt-8 md:[data-state=open]:mt-16"
          >
            <AccordionPrimitive.Header className="relative !z-20 flex !cursor-pointer py-[30px] lg:py-14">
              <AccordionPrimitive.Trigger className="focus-visible:border-ring focus-visible:ring-ring/50 [& flex flex-1 items-center justify-between rounded-md px-5 py-2 text-left text-[15px] leading-6 font-semibold transition-all outline-none focus-visible:ring-[3px] lg:px-[90px]">
                <Image
                  src={item.background || ""}
                  alt="somethig"
                  fill
                  objectPosition="cover"
                  objectFit="center"
                  className="z-0 w-full"
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

                <AccordionDownIcon className="pointer-events-non z-10 size-8 shrink-0 transition-transform duration-200 lg:size-16" />
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionContent className="text-muted-foreground !z-0 px-4 lg:px-[90px]">
              {item.section}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
