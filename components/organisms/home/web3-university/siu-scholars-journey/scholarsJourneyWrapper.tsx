import { Course, ScholarsData } from "@/types/home";
import HeroSection from "../HeroSection";
import { SiHerKollab } from "../../scholars/SiHerKollab";
import { IdeasLab } from "../IdeasLab";
import { VideoCarousel } from "@/components/molecules/carousels/videoCarousel";

export function ScholarsJourneyWrapper({
  scholarsData,
  cardsData,
}: {
  scholarsData: ScholarsData;
  cardsData: Course[];
}) {
  console.log("cardsData", cardsData);
  return (
    <div id="scholars" className="">
      <HeroSection data={scholarsData.introduction} />
      <div id="" className="">
        <VideoCarousel
          hidetitleAndDescription={true}
          title={scholarsData?.education_title || "SI U Education"}
          description={
            scholarsData?.education_description ||
            "Discover leading-edge insights and education in our free and open university."
          }
          itemsPerSlide={6}
          items={scholarsData.courses}
        />
      </div>
      <SiHerKollab data={scholarsData} cardsData={cardsData} />

      <div id="si_u_scholars_education" className="pb-8">
        <IdeasLab
          data={scholarsData}
          title={scholarsData.ideas_title}
          description={scholarsData.ideas_description}
        />
      </div>
    </div>
  );
}
