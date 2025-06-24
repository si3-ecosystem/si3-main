"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { setActiveSection } from "@/redux/slice/activeSectionSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";

type Tab = {
  id: "scholars" | "guides" | "partners";
  label: string;
};

export function PathTabs() {
  const dispatch = useAppDispatch();
  const activeSection = useAppSelector(
    (state) => state.activeSection.activeSection,
  );

  const tabs: Tab[] = [
    { id: "scholars", label: "SI U Scholars" },
    { id: "guides", label: "SI Her Guides" },
    { id: "partners", label: "SI<3> Partners" },
  ];

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Sync tab with URL hash
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (["scholars", "guides", "partners"].includes(hash)) {
      dispatch(setActiveSection(hash as "scholars" | "guides" | "partners"));
    }
  }, [pathname, searchParams, dispatch]);

  const handleTabClick = (tabId: "scholars" | "guides" | "partners") => {
    dispatch(setActiveSection(tabId));
    // Update URL hash using Next.js router
    router.push(`#${tabId}`, { scroll: false });
  };

  return (
    <div className="mb-8 lg:hidden">
      <div className="flex w-full rounded-lg p-1 transition-all duration-300 ease-in-out">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={cn(
              "flex-1 cursor-pointer rounded-2xl py-2.5 text-center text-sm font-medium !text-black",
              activeSection === tab.id
                ? "bg-[#CC9DE7] text-[#313131] shadow-xl"
                : "text-[#313131]",
            )}
          >
            {tab.label}
          </div>
        ))}
      </div>
    </div>
  );
}
