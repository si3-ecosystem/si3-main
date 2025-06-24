"use client";
import { SpotlightCard } from "@/components/molecules/cards/SpotlightCard";
import { PartialContentCarousel } from "@/components/molecules/carousels/PartialContentCarousel";
import { GuidesData } from "@/types/home";

type Props = {
  data: GuidesData;
};

export function SpotlightSection({ data }: Props) {
  return (
    <div className="py-14 pb-0 lg:py-20">
      <PartialContentCarousel
        title={data.members_title}
        description={data.members_description}
        items={data.members}
        autoplay={true}
        autoplayInterval={3500}
        renderItem={(item, key) => (
          <SpotlightCard
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            item={item}
            key={key}
          />
        )}
        className=""
      />
    </div>
  );
}
