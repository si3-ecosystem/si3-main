"use client";

import { OnboardSchema } from "@/types/onboard";
import Image from "next/image";
import { Scholars } from "../../onboard/paths/Scholars";
import { Guides } from "../../onboard/paths/Guides";
import { Partners } from "../../onboard/paths/Partners";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { PathTabs } from "@/components/molecules/tabs/PathTabs";
import { useEffect } from "react";
import { setActiveSection } from "@/redux/slice/activeSectionSlice";
import { usePathname, useRouter } from "next/navigation";

export function Web3UniversitySection({ data }: { data: OnboardSchema }) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const activeSection = useAppSelector(
    (state) => state.activeSection.activeSection,
  );

  // Handle URL hash changes
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash && ["scholars", "guides", "partners"].includes(hash)) {
      dispatch(setActiveSection(hash as "scholars" | "guides" | "partners"));
    }
  }, [dispatch]);

  const handleSectionHover = (section: "scholars" | "guides" | "partners") => {
    dispatch(setActiveSection(section));
  };

  const handleSectionClick = (section: "scholars" | "guides" | "partners") => {
    dispatch(setActiveSection(section));
    // Only update URL on click
    const newUrl = `${pathname}#${section}`;
    router.push(newUrl, { scroll: false });
  };
  const renderActiveSection = () => {
    switch (activeSection) {
      case "scholars":
        return <Scholars data={data.onboard_materials[0]} showSvg={true} />;
      case "guides":
        return <Guides data={data.onboard_materials[1]} showSvg={true} />;
      case "partners":
        return <Partners data={data.onboard_materials[2]} showSvg={true} />;
      default:
        return <Scholars data={data.onboard_materials[0]} showSvg={true} />;
    }
  };

  return (
    <section id="si-u" className="@container relative">
      <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
        <Image
          src="/home/web3-university-bg.svg"
          alt="web3 university background"
          fill
          className="sm:blur-0 h-full w-full bg-center object-cover blur-xl"
        />
        <div className="absolute inset-0 bg-black/30 sm:hidden" />
      </div>
      <div className="layout z-20 space-y-[30px] max-lg:py-9 lg:space-y-[70px] lg:py-[77px]">
        <div className="space-y-6">
          <div className="">
            <h2 className="font-clesmont text-center text-[48px] leading-[125%] font-normal text-white lg:text-[50px] lg:leading-[140%] lg:text-black">
              SI U:
            </h2>
            <h2 className="font-clesmont text-center text-[27px] leading-[125%] font-normal text-white lg:text-[40px] lg:leading-[140%] lg:text-black">
              THE WEB3 UNIVERSITY
            </h2>
          </div>
          <p className="text-center text-[15px] leading-[140%] font-medium text-[#A7A7A7] lg:text-[25px] lg:text-[#2B2B2B]">
            Experience our learning system to develop and accelerate your skills
            in the new economy.
          </p>
        </div>

        <div className="z-0">
          {/* Mobile Tabs */}
          <div className="lg:hidden">
            <PathTabs />
            <div className="mt-6 max-sm:px-5" id="mobile-tabs">
              {renderActiveSection()}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden lg:block">
            <ul className="grid h-full grid-cols-1 gap-8 @3xl:grid-cols-3">
              <li
                onMouseEnter={() => handleSectionHover("scholars")}
                onClick={() => handleSectionClick("scholars")}
              >
                <Scholars data={data.onboard_materials[0]} showSvg={true} />
              </li>
              <li
                id="guides"
                onMouseEnter={() => handleSectionHover("guides")}
                onClick={() => handleSectionClick("guides")}
              >
                <Guides data={data.onboard_materials[1]} showSvg={true} />
              </li>
              <li
                id="partners"
                onMouseEnter={() => handleSectionHover("partners")}
                onClick={() => handleSectionClick("partners")}
              >
                <Partners data={data.onboard_materials[2]} showSvg={true} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
