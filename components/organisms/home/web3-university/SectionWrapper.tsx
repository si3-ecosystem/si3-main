"use client";

import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/store";
import { ScholarsJourneyWrapper } from "./siu-scholars-journey/scholarsJourneyWrapper";
import { GuidesJourneyWrapper } from "./si-her-guides-experience/guidesJourneyWrapper";
import { PartnersJourneyWrapper } from "./si-partners-opportunities/PartnersJourneyWrapper";
import { ScholarsData, GuidesData, PartnersData } from "@/types/home";

type Props = {
  scholarsData: ScholarsData;
  guidesData: GuidesData;
  partnersData: PartnersData;
};

export function SectionWrapper({
  scholarsData,
  guidesData,
  partnersData,
}: Props) {
  const activeSection = useAppSelector(
    (state) => state.activeSection.activeSection,
  );

  const SectionComponents = {
    scholars: ScholarsJourneyWrapper,
    guides: GuidesJourneyWrapper,
    partners: PartnersJourneyWrapper,
  };

  const SectionComponent =
    SectionComponents[activeSection as keyof typeof SectionComponents] ||
    (() => null);

  return (
    <div className="@container h-full w-full from-[#E5ABFF] via-[#8300BE] to-[#450063] bg-[length:100%_100%] bg-no-repeat max-lg:bg-gradient-to-br max-lg:from-[#211257] max-lg:to-[#8A04C5]">
      <h2
        className={cn(
          "font-clesmont layout pt-0 text-[32px] leading-[50px] font-normal text-white max-lg:p-8 md:text-[40px] lg:text-black",
          activeSection === "scholars" && "text-center lg:text-left",
          activeSection === "guides" && "text-center",
          activeSection === "partners" && "text-center lg:text-right",
        )}
      >
        {activeSection === "scholars" && "SI U SCHOLARS JOURNEY"}
        {activeSection === "guides" && "SI HER GUIDES EXPERIENCE"}
        {activeSection === "partners" && "SI<3> PARTNER OPPORTUNITIES"}
      </h2>

      <div
        id="scholars"
        className="relative h-full w-full rounded-[30px] from-[#E5ABFF] via-[#6B0099] to-[#450063] max-lg:bg-white lg:bg-gradient-to-br"
      >
        <div id="guides" className="layout min-h-screen max-lg:p-8 lg:py-24">
          <div id="partners">
            <SectionComponent
              scholarsData={scholarsData}
              guidesData={guidesData}
              partnersData={partnersData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
