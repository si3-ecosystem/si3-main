"use client";
import { GuidesData, PartnersData, ScholarsData } from "@/types/home";
import { Paths } from "./Paths";
import { ScholarsJourneyWrapper } from "./siu-scholars-journey/scholarsJourneyWrapper";
import { GuidesJourneyWrapper } from "./si-her-guides-experience/guidesJourneyWrapper";
import { PartnersJourneyWrapper } from "./si-partners-opportunities/PartnersJourneyWrapper";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type Props = {
  scholarsData: ScholarsData;
  guidesData: GuidesData;
  partnersData: PartnersData;
};

export function PathsContainer({
  scholarsData,
  guidesData,
  partnersData,
}: Props) {
  const { activeSection } = useSelector(
    (state: RootState) => state.activeSection,
  );

  return (
    <section id="si-u" className="relative w-full">
      <div className="relative flex w-full flex-col gap-10 max-lg:-mt-8">
        <div className="relative flex w-full flex-col lg:flex-row lg:items-start lg:gap-8">
          {/* Sticky Sidebar */}
          <div className="relative z-10 w-full max-lg:hidden md:!sticky md:!top-[500px] md:h-[calc(100vh-120px)] md:max-w-[289px]">
            <div className="h-full overflow-y-auto">
              <Paths />
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full flex-1 transition-all duration-500 ease-in-out lg:pl-8">
            {activeSection === "scholars" && (
              <ScholarsJourneyWrapper scholarsData={scholarsData} />
            )}
            {activeSection === "guides" && (
              <GuidesJourneyWrapper guidesData={guidesData} />
            )}
            {activeSection === "partners" && (
              <PartnersJourneyWrapper partnersData={partnersData} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
