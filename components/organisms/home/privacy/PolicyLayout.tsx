"use client";

import React, { useEffect, useRef, useState } from "react";
import { SidebarNav } from "./Sidebar";

interface Section {
  id: string;
  title: string;
  content?: string;
}

interface PolicyLayoutProps {
  sections: Section[];
  content: Record<string, string>;
}

export const PolicyLayout: React.FC<PolicyLayoutProps> = ({
  sections,
  content,
}) => {
  const [activeSection, setActiveSection] = useState<string>(sections[0].id);
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
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = contentRef.current?.querySelector(
      `[data-section="${sectionId}"]`,
    );
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="border-2 border-gray-300">
        <div className="mx-auto w-full max-w-[1440px] px-4 lg:px-24">
          <div className="flex h-[calc(100vh-6rem)] flex-col gap-8 divide-x-2 divide-gray-300 lg:flex-row">
            <SidebarNav
              sections={sections}
              activeSection={activeSection}
              onSectionClick={scrollToSection}
            />
            <div ref={contentRef} className="overflow-y-auto py-7 lg:w-3/4">
              <div className="prose max-w-none">
                <h3 className="font-clesmont mb-6 text-[32px] leading-9">
                  {"Si<3>"} Privacy Policy
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
                    <div className="text-base leading-5 font-normal whitespace-pre-wrap text-[#454545]">
                      {content[section.id]}
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
