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
      <div className="flex w-full rounded-lg p-1 px-3 transition-all duration-300 ease-in-out">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={cn(
              "flex-1 rounded-md py-2.5 text-center text-sm font-medium transition-colors",
              activeSection === tab.id
                ? "active-universe bg-[#4c2984] text-white"
                : "bg-transparent text-[#A6A6A6]",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
