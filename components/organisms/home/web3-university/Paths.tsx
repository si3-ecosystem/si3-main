"use client";

import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  SectionType,
  setActiveSection,
} from "@/redux/slice/activeSectionSlice";
import { usePlausible } from "next-plausible";
import { useRouter } from "next/navigation";

export function Paths() {
  const plausible = usePlausible();
  const dispatch = useDispatch();
  const router = useRouter();
  const { activeSection } = useSelector(
    (state: RootState) => state.activeSection,
  );

  const handleSetActiveSection = (section: SectionType) => {
    dispatch(setActiveSection(section));
    plausible("Path Option Clicked", { props: { path: section } });
    router.push(`#${section}`);
  };

  const paths = [
    {
      title: "SCHOLARS",
      slug: "scholars" as SectionType,
    },
    {
      title: "GUIDES",
      slug: "guides" as SectionType,
    },
    {
      title: "PARTNERS",
      slug: "partners" as SectionType,
    },
  ];

  return (
    <div className="hidden space-y-6 md:block">
      <h2 className="font-clesmont text-center text-[45px] leading-[125%] font-normal">
        Paths
      </h2>
      <div className="flex flex-col gap-7 transition-all duration-300 ease-in-out">
        {paths.map((path) => (
          <div key={path.slug} className="relative overflow-hidden rounded-lg">
            <button
              onClick={() => handleSetActiveSection(path.slug)}
              className={cn(
                "group font-clesmont relative w-full cursor-pointer rounded-lg px-5 py-2.5 text-center text-2xl transition-all duration-300",
                activeSection === path.slug
                  ? "bg-[#9F44D34F]"
                  : "border border-[#9F44D3] bg-[#9F44D30D]",
              )}
            >
              <span className="relative z-10">{path.title}</span>
              <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-[#9F44D3] to-[#D939CD] transition-transform duration-500 ease-out group-hover:translate-x-0 group-active:translate-x-0"></div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
