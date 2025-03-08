import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/atoms/accordion";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

import { ChevronDownIcon } from "lucide-react";
import { ReactNode } from "react";

export interface AccordionRenderItem {
  title: string;
  value: string;
  sub?: string;
  section: ReactNode;
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
        className="w-full"
        defaultValue={defaultValue || renderItems[0]?.value}
      >
        {renderItems.map((item) => (
          <AccordionItem value={item.value} key={item.value} className="py-2">
            <AccordionPrimitive.Header className="flex">
              <AccordionPrimitive.Trigger className="focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-between rounded-md py-2 text-left text-[15px] leading-6 font-semibold transition-all outline-none focus-visible:ring-[3px] [&[data-state=open]>svg]:rotate-180">
                <span className="flex flex-col space-y-1">
                  <span>{item.title}</span>
                  {item.sub && (
                    <span className="text-sm font-normal">{item.sub}</span>
                  )}
                </span>
                <ChevronDownIcon
                  size={16}
                  className="pointer-events-none shrink-0 opacity-60 transition-transform duration-200"
                  aria-hidden="true"
                />
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionContent className="text-muted-foreground pb-2">
              {item.section}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
