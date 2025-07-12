"use client";

import { SheetClose } from "@/components/atoms/sheet";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/atoms/accordion";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useAppDispatch } from "@/redux/store";
import { usePlausible } from "next-plausible";
import { setActiveAccordionValue } from "@/redux/slice/communitySlice";
import { openGrow3dgeModal } from "@/redux/slice/grow3dgeSlice";
// import { Button } from "@/components/atoms/button";
import { usePathname, useRouter } from "next/navigation";

export function AccordionMenu() {
  const plausible = usePlausible();
  const [openSection, setOpenSection] = useState<string>("");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathName = usePathname();

  const menuItems = [
    {
      id: "learn",
      title: "LEARN",
      items: [
        {
          title: "Scholars",
          href: "/#scholars",
          accordionValue: "scholars",
        },
        {
          title: "Guides",
          href: "/#guides",
          accordionValue: "guides",
        },
        {
          title: "Partners",
          href: "/#partners",
          accordionValue: "partners",
        },
      ],
    },
    {
      id: "lead",
      title: "LEAD",
      items: [
        {
          title: "Si Her Guides",
          href: "/#si_her_guides",
          accordionValue: "si_her_guides",
        },
      ],
    },
    {
      id: "grow",
      title: "GROW",
      items: [
        {
          title: "Grow3dge Accelerator",
          href: "#",
          accordionValue: "grow3dge",
          isGrow3dge: true,
        },
      ],
    },
    { id: "mission", title: "MISSION", items: [] },
    {
      id: "stay-connected",
      title: "STAY CONNECTED",
      items: [
        {
          title: "X",
          href: "http://x.com/si3_ecosystem",
          accordionValue: null,
        },
        {
          title: "LinkedIn",
          href: "https://www.linkedin.com/company/si3ecosystem/",
          accordionValue: null,
        },
        {
          title: "Email Newsletter",
          href: "/#stayConnected",
          accordionValue: null,
        },
      ],
    },
  ];

  const scrollToSection = (id: string, attempts = 0) => {
    if (attempts >= 5) {
      console.error(
        `Failed to find element with ID: ${id} after multiple attempts`,
      );
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 160;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    } else {
      // Try again after a delay if element not found
      setTimeout(() => scrollToSection(id, attempts + 1), 100);
    }
  };

  const handleMenuItemClick = async (
    href: string,
    accordionValue: string | null,
    isGrow3dge = false,
  ) => {
    if (isGrow3dge) {
      plausible("CTA Popup Opened");
      dispatch(openGrow3dgeModal());
      return;
    }

    // Handle navigation first
    if (href.startsWith("/#")) {
      const sectionId = href.split("#")[1];
      // If we're already on the page, just scroll
      if (pathName === "/") {
        scrollToSection(sectionId);
      } else {
        // If we need to navigate first, then scroll after navigation
        router.push(`/#${sectionId}`);
        // Wait for navigation to complete
        await new Promise((resolve) => setTimeout(resolve, 300));
        scrollToSection(sectionId);
      }
    } else if (href && !href.startsWith("#")) {
      router.push(href);
    }

    // Handle accordion state
    if (accordionValue) {
      if (pathName === "/about") {
        setTimeout(() => {
          dispatch(setActiveAccordionValue(accordionValue));
        }, 1500);
      } else {
        dispatch(setActiveAccordionValue(accordionValue));
      }
    }
  };

  return (
    <div className="flex h-screen flex-col bg-white">
      <Accordion
        type="single"
        collapsible
        className="mb-8 h-fit pt-4"
        value={openSection}
        onValueChange={(value) => setOpenSection(value)}
      >
        {menuItems.map((section) => (
          <AccordionItem
            key={section.id}
            value={section.id}
            className="flex flex-col border-t border-[#B0B0B0] last-of-type:border-b"
          >
            <AccordionTrigger
              className="flex w-full items-center justify-between px-4 py-0 transition-all duration-300 ease-in-out hover:no-underline"
              showPurpleChevron={openSection === section.id}
              showChevronRight={section?.items.length === 0}
            >
              {section?.items?.length === 0 ? (
                <SheetClose asChild>
                  <Link
                    href={`/${section.id}`}
                    className={cn(
                      "w-full px-2.5 py-[30px] text-base",
                      openSection === section.id
                        ? "text-primary rounded-md"
                        : "border-r border-[#B0B0B0] text-black",
                    )}
                  >
                    {section.title}
                  </Link>
                </SheetClose>
              ) : (
                <span
                  className={cn(
                    "flex w-full items-center gap-1 px-2.5 py-[30px] text-base",
                    openSection === section.id
                      ? "text-primary -ml-4 rounded-md"
                      : "border-r border-[#B0B0B0] text-black",
                  )}
                >
                  {openSection === section.id && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="32"
                      viewBox="0 0 13 32"
                      fill="none"
                    >
                      <path
                        d="M13 0.5H5C2.79086 0.5 1 2.29086 1 4.5V27C1 29.2091 2.79086 31 5 31H13"
                        stroke="#9F44D3"
                      />
                    </svg>
                  )}
                  {section.title}
                  {openSection === section.id && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="32"
                      viewBox="0 0 13 32"
                      fill="none"
                    >
                      <path
                        d="M0 0.5H8C10.2091 0.5 12 2.29086 12 4.5V27C12 29.2091 10.2091 31 8 31H0"
                        stroke="#9F44D3"
                      />
                    </svg>
                  )}
                </span>
              )}
            </AccordionTrigger>
            {section.items.length > 0 && (
              <AccordionContent className="px-8 pb-3">
                {section.items.map((item, idx) => (
                  <SheetClose key={idx} asChild>
                    <Link
                      href={item.href}
                      className="block p-2.5 text-sm text-gray-700 hover:text-purple-500"
                      onClick={() => {
                        handleMenuItemClick(
                          item.href,
                          item.accordionValue,
                          item.isGrow3dge,
                        );
                      }}
                      target={item.href.startsWith("http") ? "_blank" : "_self"}
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {item.title}
                    </Link>
                  </SheetClose>
                ))}
              </AccordionContent>
            )}
          </AccordionItem>
        ))}
      </Accordion>

      {/* <div className="border-t border-gray-200">
        <SheetClose asChild>
          <Button
            asChild
            className="mb-4 w-full rounded-md bg-black py-3 text-white"
          >
            <Link href={"/login"}>SI U Onboard</Link>
          </Button>
        </SheetClose>
      </div> */}
    </div>
  );
}
