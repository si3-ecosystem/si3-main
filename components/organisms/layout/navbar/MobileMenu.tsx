"use client";

import { BookText, CircleUserRound, Handshake } from "lucide-react";
import Logo from "@/components/atoms/Logo";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/atoms/sheet";
import React from "react";
import { ChevronRight, Globe } from "lucide-react";
import { UserGroup } from "@/components/molecules/icons/UserGroup";
import { ProgrammingIcon } from "@/components/molecules/icons/ProgrammingIcon";
import { GroupIcon } from "@/components/molecules/icons/GroupIcon";

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="group h-full w-full rounded-full bg-black p-2">
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
        <SheetHeader className="flex flex-row items-center justify-between border-b border-gray-300 p-4">
          <SheetTitle className="!p-0">
            <Logo src="/logo.svg" alt="SI3 Logo" />
          </SheetTitle>
        </SheetHeader>
        <div className="no-scrollbar flex h-[calc(100vh-64px)] flex-col justify-between overflow-y-scroll pb-32">
          <div className="px-4 pb-6">
            {/* Section: SI U Scholars */}
            <div className="mb-3">
              <h3 className="mb-3 text-lg font-bold text-black uppercase">
                SI U Scholars
              </h3>
              <div className="space-y-3">
                <SheetClose asChild>
                  <Link
                    href="/#pathways"
                    className="flex items-center justify-between rounded-lg p-2 hover:bg-gray-100"
                  >
                    <div className="flex items-start gap-2">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-200 p-1.5">
                        <BookText className="h-4 w-4 text-[#5D5D5D]" />
                      </div>
                      <div>
                        <p className="text-[15px] font-normal">SI U</p>
                        <p className="text-sm text-[#5D5D5D]">
                          Open education system powered by in-the-field experts.
                        </p>
                      </div>
                    </div>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/#pathways"
                    className="flex items-center justify-between rounded-lg p-2 hover:bg-gray-100"
                  >
                    <div className="flex items-start gap-2">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-200 p-1.5">
                        <UserGroup />
                      </div>
                      <div>
                        <p className="text-[15px] font-normal">SI Her Kollab</p>
                        <p className="text-sm text-[#5D5D5D]">
                          Collaborative of 30+ communities.
                        </p>
                      </div>
                    </div>
                  </Link>
                </SheetClose>
              </div>
            </div>

            {/* Section: SI Her Guides */}
            <div className="mb-3">
              <h3 className="mb-3 text-lg font-bold text-black uppercase">
                SI Her Guides
              </h3>
              <div className="space-y-4">
                <SheetClose asChild>
                  <Link
                    href="/#pathways"
                    className="flex items-center justify-between rounded-lg p-2 hover:bg-gray-100"
                  >
                    <div className="flex items-start gap-2">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-200 p-1.5">
                        <ProgrammingIcon />
                      </div>
                      <div>
                        <p className="text-[15px] font-normal">
                          SI Her Programming
                        </p>
                        <p className="text-sm text-[#5D5D5D]">
                          Advanced professional development and leadership
                          programs.
                        </p>
                      </div>
                    </div>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/#pathways"
                    className="flex items-center justify-between rounded-lg p-2 hover:bg-gray-100"
                  >
                    <div className="flex items-start gap-2">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-200 p-1.5">
                        <Globe className="h-6 w-6 text-[#5D5D5D]" />
                      </div>
                      <div>
                        <p className="text-[15px] font-normal">SI Her Eth</p>
                        <p className="text-sm text-[#5D5D5D]">
                          Web3 personal brand template for our Si Her Guides.
                        </p>
                      </div>
                    </div>
                  </Link>
                </SheetClose>
              </div>
            </div>

            {/* Section: SI<3>Partners */}
            <div className="mb-3">
              <h3 className="mb-3 text-lg font-bold text-black uppercase">
                SI&lt;3&gt;Partners
              </h3>
              <div className="space-y-4">
                <SheetClose asChild>
                  <Link
                    href="/#pathways"
                    className="flex items-center justify-between rounded-lg p-2 hover:bg-gray-100"
                  >
                    <div className="flex items-start gap-2">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-200 p-1.5">
                        <Handshake className="h-6 w-6 text-[#5D5D5D]" />
                      </div>
                      <div>
                        <p className="text-[15px] font-normal">
                          Partner Workshops
                        </p>
                        <p className="text-sm text-[#5D5D5D]">
                          Diversity, Equity, Accessibility and Inclusion
                          training for aligned organizations.
                        </p>
                      </div>
                    </div>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/onboard"
                    className="flex items-center justify-between rounded-lg p-2 hover:bg-gray-100"
                  >
                    <div className="flex items-start gap-2">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-200 p-1.5">
                        <GroupIcon />
                      </div>
                      <div>
                        <p className="text-[15px] font-normal">DEAI Training</p>
                        <p className="text-sm text-[#5D5D5D]">
                          Educational workshops and collaborative growth
                          campaigns with our members.
                        </p>
                      </div>
                    </div>
                  </Link>
                </SheetClose>
              </div>
            </div>

            {/* About Us */}
            <div className="mb-3">
              <SheetClose asChild>
                <Link
                  href="/about"
                  className="flex items-center justify-between rounded-lg p-2 hover:bg-gray-100"
                >
                  <p className="text-lg font-bold text-black">About Us</p>
                  <ChevronRight className="h-5 w-5 text-[#5D5D5D]" />
                </Link>
              </SheetClose>
            </div>
          </div>

          {/* Footer Section */}
          <div className="space-y-4 px-4 pb-6">
            <SheetClose asChild>
              <Link
                href="/onboard"
                className="block w-full rounded-full bg-black py-2.5 text-center text-lg font-semibold text-white"
              >
                Get Started
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/login"
                className="h-10text-center flex w-full items-center justify-center rounded-full border border-gray-300 py-2.5 text-lg font-semibold text-gray-700"
              >
                <span className="mr-2">
                  <CircleUserRound className="h-5 w-5" />
                </span>
                Member Login
              </Link>
            </SheetClose>

            <div className="rounded-lg bg-gray-200 p-4 text-black">
              <p className="text-base font-medium">
                Help us build a more inclusive Web3!
              </p>
              <p className="text-sm">
                Share your unique perspective by filling out our Diversity
                Tracker—your voice matters.
              </p>
              <SheetClose asChild className="mt-2">
                <Link
                  href="/about"
                  className="block w-fit rounded-full border border-black bg-white px-3 py-2 text-center text-black hover:border-black hover:bg-black hover:text-white"
                >
                  Learn More
                </Link>
              </SheetClose>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
