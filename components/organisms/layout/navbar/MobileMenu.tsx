"use client";

import Logo from "@/components/atoms/Logo";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/atoms/sheet";
import React from "react";
import { AccordionMenu } from "@/components/molecules/accordions/NavAccordion";
import Link from "next/link";

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="group h-full w-fit rounded-full bg-black p-2 lg:hidden">
          <svg
            className="pointer-events-none size-6"
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 12L20 12"
              className="origin-center -translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
            />
            <path
              d="M4 12H20"
              className="origin-center transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
            />
            <path
              d="M4 12H20"
              className="origin-center translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
            />
          </svg>
        </div>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="h-[100vh] w-full bg-white p-0 !pb-12"
      >
        <SheetHeader className="flex flex-row items-center justify-between border-b border-gray-300 p-4 py-6">
          <SheetTitle asChild className="!p-0">
            <Link href={"/"}>
              <Logo src="/logo.svg" alt="SI3 Logo" />
            </Link>
          </SheetTitle>
        </SheetHeader>
        <div className="no-scrollbar -top-4 -mt-4 flex h-[calc(100vh-64px)] flex-col justify-between overflow-y-scroll pb-32">
          <div className="-mt-4 px-4">
            <AccordionMenu />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
