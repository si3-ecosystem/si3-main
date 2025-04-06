"use client";

import React, { useEffect, useRef, useState } from "react";
import { SidebarNav } from "./Sidebar";
import { PortableText } from "@/lib/sanity/portabletext";
import { Button } from "@/components/atoms/button";

interface Section {
  id: string;
  title: string;
  content: unknown[];
}

interface PolicyLayoutProps {
  sections: Section[];
  policyButtons: { label: string; type: string }[];
  setActivePolicy: (policy: string) => void;
  activePolicy: string;
}

export const PolicyLayout: React.FC<PolicyLayoutProps> = ({
  sections,
  policyButtons,
  setActivePolicy,
  activePolicy,
}) => {
  const [activeSection, setActiveSection] = useState<string>(
    sections[0]?.id || "",
  );
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const scrollPosition = contentRef.current.scrollTop + 100;
      const sections = contentRef.current.querySelectorAll("[data-section]");

      for (const section of sections) {
        const { offsetTop, offsetHeight } = section as HTMLElement;
        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          setActiveSection(
            section.getAttribute("data-section") || sections[0].id,
          );
          break;
        }
      }
    };

    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener("scroll", handleScroll);
      return () => contentElement.removeEventListener("scroll", handleScroll);
    }
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const section = contentRef.current?.querySelector(
      `[data-section="${sectionId}"]`,
    );
    if (section && contentRef.current) {
      const sectionTop = section.getBoundingClientRect().top;
      const containerTop = contentRef.current.getBoundingClientRect().top;
      const offset =
        sectionTop - containerTop + contentRef.current.scrollTop - 64;

      contentRef.current.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="pt-4">
      <div className="border-2 border-gray-300">
        <div className="mx-auto w-full max-w-[1440px] px-4 lg:px-24">
          <div className="flex h-[calc(100vh-6rem)] flex-col gap-8 divide-x-2 divide-gray-300 lg:flex-row">
            <SidebarNav
              sections={sections}
              activeSection={activeSection}
              onSectionClick={scrollToSection}
            />
            <div
              ref={contentRef}
              className="flex flex-col gap-11 overflow-x-hidden overflow-y-auto py-7 lg:w-3/4 lg:pb-96"
            >
              <div className="">
                <div className="no-scrollbar mx-auto flex flex-nowrap gap-6 overflow-x-scroll pr-4 lg:px-24">
                  {policyButtons.map((button) => (
                    <Button
                      key={button.type}
                      onClick={() => setActivePolicy(button.type)}
                      className={`rounded-full px-4 py-2 font-medium ${
                        activePolicy === button.type
                          ? "bg-black text-white"
                          : "bg-[#eeeeee] text-black hover:bg-black hover:text-white"
                      }`}
                    >
                      {button.label}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="prose max-w-none">
                <h3 className="font-clesmont mb-6 text-[32px] leading-9">
                  {sections[0]?.title || "Policy"}
                </h3>
                {sections.map((section, index) => (
                  <div
                    key={section.id}
                    data-section={section.id}
                    className="mb-12"
                  >
                    <h2 className="mb-4 text-lg font-medium uppercase">
                      {index + 1}. {section.title}
                    </h2>
                    <div className="prose text-base leading-5 font-normal whitespace-pre-wrap text-[#454545]">
                      <PortableText value={section.content} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
