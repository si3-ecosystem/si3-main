// components/SidebarNav.tsx
import React from "react";
import { Section } from "@/types/privacy";

interface SidebarNavProps {
  sections: Section[];
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  sections,
  activeSection,
  onSectionClick,
}) => {
  return (
    <div className="hidden overflow-y-auto py-7 lg:block lg:w-1/4 lg:pt-11 lg:pb-24">
      <div className="sticky top-0">
        <nav className="">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionClick(section.id)}
              className={`w-full cursor-pointer py-3 text-left transition-colors hover:text-black hover:opacity-100 ${
                activeSection === section.id
                  ? "text-base font-medium text-black"
                  : "font-medium text-black opacity-70"
              }`}
            >
              {section.title}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};
