import { Section } from "@/types/privacy";
import { Element } from "react-scroll";

interface ContentProps {
  sections: Section[];
  sectionRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
}

export function Content({ sections, sectionRefs }: ContentProps) {
  return (
    <main className="ml-[25%] w-3/4 bg-white p-8">
      {sections.map((section, index) => (
        <Element
          key={section.id}
          name={section.id}
          id={section.id}
          className="mb-8"
          ref={(el) => (sectionRefs.current[section.id] = el)}
        >
          <h2 className="mb-4 text-2xl font-bold">
            {index + 1}. {section.title}
          </h2>
          {section.content}
        </Element>
      ))}
    </main>
  );
}
