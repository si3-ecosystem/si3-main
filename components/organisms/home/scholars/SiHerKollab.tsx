"use client";

import { CollabCard } from "@/components/molecules/cards/collabCard";
import { VideoCarousel } from "@/components/molecules/carousels/videoCarousel";
import { ScholarsData } from "@/types/home";

type Props = {
  data: ScholarsData;
};
export function SiHerKollab({ data }: Props) {
  return (
    <div className="h-full py-14 lg:py-20">
      <VideoCarousel
        title={data?.community_title || "Si Her Kollab"}
        description={
          data?.community_description ||
          "Explore our growing collaborative of women & non-binary led Web3 communities."
        }
        itemsPerSlide={3}
        items={data.communities}
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
