import { GuidesData } from "@/types/home";
import HeroSection from "../HeroSection";
import { Web3Brand } from "../../guides/Web3Brand";
import { SpotlightSection } from "../../guides/SpotlightSection";
import { Programming } from "../../guides/Programming";
import { Testimonials } from "@/components/molecules/carousels/Testimonials";

export function GuidesJourneyWrapper({
  guidesData,
}: {
  guidesData: GuidesData;
}) {
  return (
    <div id="guides">
      <HeroSection data={guidesData.introduction} />
      <div className="">
        <Web3Brand data={guidesData.web3brands} />
      </div>
      <div className="">
        <SpotlightSection data={guidesData} />
      </div>
      <div id="si_her_guides_programming" className="">
        <Programming data={guidesData} />
      </div>
      <div className="">
        <Testimonials
          items={guidesData.testimonials}
          isCover={true}
          title="Si Her Testimonials"
        />
      </div>
    </div>
  );
}
