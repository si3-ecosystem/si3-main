import { VideoCarousel } from "@/components/molecules/carousels/videoCarousel";
import { HeroSection } from "../HeroSection";
import { SiHerKollab } from "./SiHerKollab";
import { ScholarsData } from "@/types/home";

export interface SiUScholarsWrapperProps {
  data: ScholarsData;
}

export function SiUScholarsWrapper({ data }: SiUScholarsWrapperProps) {
  return (
    <section className="px-4 pb-2 lg:px-[90px] lg:pb-14">
      <HeroSection data={data.introduction} />
      <div id="si_u_scholars_education" className="py-20">
        <VideoCarousel
          title={data?.education_title || "SI U Education"}
          description={
            data?.education_description ||
            "Discover leading-edge insights and education in our free and open university."
          }
          itemsPerSlide={6}
          items={data.courses}
        />
      </div>
      <SiHerKollab data={data} />
    </section>
  );
}
