"use client";

import { CollabCard } from "@/components/molecules/cards/collabCard";
import { VideoCarousel } from "@/components/molecules/carousels/videoCarousel";
import { Course, ScholarsData } from "@/types/home";

type Props = {
  data: ScholarsData;
  cardsData: Course[];
  joinWaitlist?: boolean;
};
export function SiHerKollab({ data, cardsData, joinWaitlist }: Props) {
  return (
    <div id="si_u_scholars_kollab" className="h-full">
      <VideoCarousel
        autoplay={true}
        autoplayInterval={3500}
        joinWaitlist={joinWaitlist}
        title={data?.community_title || "Si Her Kollab"}
        description={
          data?.community_description ||
          "Explore our growing collaborative of women & non-binary led Web3 communities."
        }
        itemsPerSlide={3}
        items={cardsData}
        renderItem={(item, key) => (
          <CollabCard
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            item={item}
            key={key}
          />
        )}
      />
    </div>
  );
}
