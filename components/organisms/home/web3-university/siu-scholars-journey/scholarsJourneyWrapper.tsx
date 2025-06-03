import { ScholarsData } from "@/types/home";
import HeroSection from "../HeroSection";
import { SiHerKollab } from "../../scholars/SiHerKollab";
import { IdeasLab } from "../IdeasLab";

export function ScholarsJourneyWrapper({
  scholarsData,
}: {
  scholarsData: ScholarsData;
}) {
  return (
    <div id="scholars" className="">
      <HeroSection data={scholarsData.introduction} />
      <SiHerKollab data={scholarsData} />
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
