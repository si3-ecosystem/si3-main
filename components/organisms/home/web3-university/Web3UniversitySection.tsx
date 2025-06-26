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
import { PathsContainer } from "./pathsContainer";
import { Course, GuidesData, PartnersData, ScholarsData } from "@/types/home";

export function Web3UniversitySection({
  data,
  scholarsData,
  guidesData,
  partnersData,
  cardsData,
}: {
  data: OnboardSchema;
  scholarsData: ScholarsData;
  guidesData: GuidesData;
  partnersData: PartnersData;
  cardsData: Course[];
}) {
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

  const renderActiveSection = () => {
    switch (activeSection) {
      case "scholars":
        return <Scholars data={data.onboard_materials[0]} showSvg={true} />;
      case "guides":
        return (
          <Guides
            data={data.onboard_materials[1]}
            showSvg={true}
            isGuide={true}
          />
        );
      case "partners":
        return (
          <Partners
            data={data.onboard_materials[2]}
            showSvg={true}
            isPartner={true}
          />
        );
      default:
        return <Scholars data={data.onboard_materials[0]} showSvg={true} />;
    }
  };

  return (
    <section id="si-u" className="@container relative">
      <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
        <Image
          src="/home/Background.svg"
          alt="web3 university background"
          fill
          className="sm:blur-0 h-full w-full bg-center object-cover blur-xl"
        />
        <div className="absolute inset-0 bg-black/30 sm:hidden" />
      </div>
      <div className="layout z-20 space-y-[30px] max-lg:px-5 max-lg:py-9 lg:space-y-[70px] lg:py-[77px]">
        <div className="">
          <div className="">
            <h2 className="font-clesmont text-center text-[40px] leading-[125%] font-normal lg:text-[50px] lg:leading-[140%] lg:text-black">
              SI U:
            </h2>
            <h2 className="font-clesmont text-center text-[25px] leading-[125%] font-normal sm:text-[32px] lg:text-[40px] lg:leading-[140%] lg:text-black">
              THE WEB3 UNIVERSITY
            </h2>
          </div>
          <p className="text-center text-[15px] leading-[140%] font-medium text-[#A7A7A7] lg:text-[20px] lg:text-[#2B2B2B]">
            Experience our learning system to develop and accelerate your skills
            in the new economy.
          </p>
        </div>

        <div className="z-0 max-lg:mb-12">
          {/* Mobile Tabs */}
          <div className="w-full lg:hidden">
            <PathTabs />
            <div className="space-y-5 lg:hidden" id="mobile-tabs">
              {renderActiveSection()}
              {activeSection === "scholars" && (
                <p className="font-clesmont text-center text-[25px] leading-[125%] font-normal">
                  SCHOLARS JOURNEY
                </p>
              )}
              {activeSection === "guides" && (
                <p className="font-clesmont text-center text-[25px] leading-[125%] font-normal">
                  GUIDES EXPERIENCE
                </p>
              )}
              {activeSection === "partners" && (
                <p className="font-clesmont text-center text-[25px] leading-[125%] font-normal">
                  PARTNER OPPORTUNITIES
                </p>
              )}
            </div>
          </div>

          <PathsContainer
            scholarsData={scholarsData}
            guidesData={guidesData}
            partnersData={partnersData}
            cardsData={cardsData}
          />
        </div>
      </div>
    </section>
  );
}
