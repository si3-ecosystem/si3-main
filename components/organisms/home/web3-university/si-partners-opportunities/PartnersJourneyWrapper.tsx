import { PartnersData } from "@/types/home";
import HeroSection from "../HeroSection";
import { ExploreSection } from "../../siPartners/ExploreSection";
import { Testimonials } from "@/components/molecules/carousels/Testimonials";

export function PartnersJourneyWrapper({
  partnersData,
}: {
  partnersData: PartnersData;
}) {
  return (
    <div id="partners">
      <HeroSection data={partnersData?.introduction} hideButton={true} />
      <div className="max-sm:mt-6">
        <ExploreSection data={partnersData.explore} />
      </div>
      <div className="mt-[200px]">
        <Testimonials
          items={partnersData.testimonials}
          isCover={false}
          title="Partner Testimonials"
        />
      </div>
    </div>
  );
}
