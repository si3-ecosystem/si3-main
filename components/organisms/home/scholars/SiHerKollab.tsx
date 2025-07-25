"use client";

import { CollabCard } from "@/components/molecules/cards/collabCard";
import { PartialContentCarousel } from "@/components/molecules/carousels/PartialContentCarousel";
import { ScholarsData } from "@/types/home";

type Props = {
  data: ScholarsData;
  joinWaitlist?: boolean;
};
export function SiHerKollab({ data, joinWaitlist }: Props) {
  return (
    <div id="si_u_scholars_kollab" className="mt-[5.7rem] h-full">
      <PartialContentCarousel
        autoplay={true}
        ctaTitle="JOIN WAITLIST"
        autoplayInterval={3500}
        joinWaitlist={joinWaitlist}
        title={data?.community_title || "Si Her Kollab"}
        description={
          data?.community_description ||
          "Explore our growing collaborative of women & non-binary led Web3 communities."
        }
        itemsPerSlide={2}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        items={data?.communities}
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
