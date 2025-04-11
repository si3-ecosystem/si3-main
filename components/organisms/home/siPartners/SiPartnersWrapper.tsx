import { HeroSection } from "../HeroSection";
import { Testimonials } from "@/components/molecules/carousels/Testimonials";
import { ExploreSection } from "./ExploreSection";
import { PartnersData } from "@/types/home";

type Props = {
  data: PartnersData;
};

export function SiPartnersWrapper({ data }: Props) {
  return (
    <section className="pb-2 lg:pb-14">
      <div id="si_partners_campaigns" className="px-4 lg:px-[90px]">
        <HeroSection
          data={data.introduction}
          isForm
          extraClassName="max-[430px]:-mt-20"
        />
      </div>
      <div id="si_partners_training" className="px-4 py-20 lg:px-[90px]">
        <ExploreSection data={data.explore} />
      </div>
      <div className="px-4 pb-10 lg:px-[90px]">
        <Testimonials
          items={data.testimonials}
          isCover={false}
          title="Partner Testimonials"
        />
      </div>
    </section>
  );
}
