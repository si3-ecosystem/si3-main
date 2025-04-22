import { HeroSection } from "../HeroSection";
import { Web3Brand } from "./Web3Brand";
import { SpotlightSection } from "./SpotlightSection";
import { Programming } from "./Programming";
import { Testimonials } from "@/components/molecules/carousels/Testimonials";
import { GuidesData } from "@/types/home";

type Props = {
  data: GuidesData;
};

export function SiHerGuidesWrapper({ data }: Props) {
  return (
    <section className="pb-2 lg:pb-14">
      <div className="px-4 lg:px-[90px]">
        <HeroSection
          data={data.introduction}
          extraClassName="max-[430px]:-mt-20"
        />
      </div>
      <div className="px-4 lg:px-[90px]">
        <Web3Brand data={data.web3brands} />
      </div>
      <div className="px-4 sm:pl-4 lg:pl-[90px]">
        <SpotlightSection data={data} />
      </div>
      <div id="si_her_guides_programming" className="px-4 sm:pl-4 lg:pl-[90px]">
        <Programming data={data} />
      </div>
      <div className="px-4 pb-10 lg:px-[90px]">
        <Testimonials
          items={data.testimonials}
          isCover={true}
          title="Si Her Testimonials"
        />
      </div>
    </section>
  );
}
