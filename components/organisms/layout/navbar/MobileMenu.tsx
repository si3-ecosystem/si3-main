import { CircleUserRound } from "lucide-react";
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
      <SheetContent side="left" className="h-[100vh] w-full bg-white p-0">
        <SheetHeader className="border-b p-4">
          <SheetTitle className="!p-3">
            <Logo src="/logo.svg" alt="SI3 Logo" />
          </SheetTitle>
        </SheetHeader>
        <div className="-mt-4 flex h-[100vh] flex-col justify-between overflow-y-scroll sm:-mt-3">
          <div className="px-4">
            <div className="mb-8 divide-y divide-gray-300 border-r border-b border-l border-gray-300">
              <div className="grid w-full grid-cols-2 divide-x divide-y divide-gray-300">
                <SheetClose asChild>
                  <Link
                    href="/#pathways"
                    className="hover:bg-primary group p-4 text-black hover:text-white sm:p-8"
                  >
                    <p className="text-lg font-bold">SI U Scholars</p>
                    <span className="hidden text-sm group-hover:block">→</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/"
                    className="hover:bg-primary group p-4 text-black hover:text-white sm:p-8"
                  >
                    <p className="text-lg font-bold">SI U</p>
                    <span className="hidden text-sm group-hover:block">→</span>
                  </Link>
                </SheetClose>
              </div>

              <div className="grid grid-cols-2 divide-x divide-y divide-gray-300">
                <SheetClose asChild>
                  <Link
                    href="/#pathways"
                    className="hover:bg-primary group p-4 text-black hover:text-white sm:p-8"
                  >
                    <p className="text-lg font-bold">Si Her Kollab</p>
                    <span className="hidden text-sm group-hover:block">→</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/#pathways"
                    className="hover:bg-primary group p-4 text-black hover:text-white sm:p-8"
                  >
                    <p className="text-lg font-bold">Si Her Guides</p>
                    <span className="hidden text-sm group-hover:block">→</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/#pathways"
                    className="hover:bg-primary group p-4 text-black hover:text-white sm:p-8"
                  >
                    <p className="text-lg font-bold">SiHerEth</p>
                    <span className="hidden text-sm group-hover:block">→</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/#pathways"
                    className="hover:bg-primary group p-4 text-black hover:text-white sm:p-8"
                  >
                    <p className="text-lg font-bold">Si Her Programming</p>
                    <span className="hidden text-sm group-hover:block">→</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/#pathways"
                    className="hover:bg-primary group p-4 text-black hover:text-white sm:p-8"
                  >
                    <p className="text-lg font-bold">{"SI<3>Partners"}</p>
                    <span className="hidden text-sm group-hover:block">→</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/#pathways"
                    className="hover:bg-primary group p-4 text-black hover:text-white sm:p-8"
                  >
                    <p className="text-lg font-bold">
                      {"SI<3>Partner Workshops"}
                    </p>
                    <span className="hidden text-sm group-hover:block">→</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/onboard"
                    className="hover:bg-primary group p-4 text-black hover:text-white sm:p-8"
                  >
                    <p className="text-lg font-bold">DEAI Training</p>
                    <span className="hidden text-sm group-hover:block">→</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/diversity-tracker"
                    className="hover:bg-primary group p-4 text-black hover:text-white sm:p-8"
                  >
                    <p className="text-lg font-bold">Diversity Tracker</p>
                    <span className="hidden text-sm group-hover:block">→</span>
                  </Link>
                </SheetClose>
              </div>

              <SheetClose asChild>
                <Link
                  href="/about"
                  className="hover:bg-primary group w-full p-4 text-center text-black hover:text-white sm:p-8"
                >
                  <p className="text-lg font-bold">About Us</p>
                </Link>
              </SheetClose>
            </div>
          </div>

          <div className="space-y-4 px-4">
            <SheetClose asChild>
              <Link
                href="/onboard"
                className="block w-full rounded-md bg-black py-2 text-center text-white"
              >
                Get Started
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/login"
                className="hover:bg-primary flex w-full items-center justify-center rounded-md border border-gray-300 py-2 text-center text-gray-700"
              >
                <span className="mr-2">
                  <CircleUserRound />
                </span>{" "}
                Member Login
              </Link>
            </SheetClose>

            <div className="mb-4 rounded-lg bg-gray-200 p-4 text-black">
              <p className="text-base font-medium">
                Help us build a more inclusive Web3!
              </p>
              <p className="text-sm">
                Share your unique perspective by filling out our Diversity
                Tracker—your voice matters.
              </p>
              <SheetClose asChild>
                <Link
                  href="/about"
                  className="mt-2 block w-fit rounded-full border border-gray-300 bg-white px-3 py-1 text-center text-black hover:border-black hover:bg-black hover:text-white"
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
