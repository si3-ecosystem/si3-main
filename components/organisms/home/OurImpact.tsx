"use client";

import { useState } from "react";
import { Title } from "@/components/atoms/title";
import { ImpactCard } from "@/components/molecules/cards/ImpactCard";
import { HomepageSchema } from "@/types/home";

type Props = {
  HomePageData: HomepageSchema;
};

export function OurImpact({ HomePageData }: Props) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleHover = (index: number) => () => {
    setHoveredIndex(index);
  };

  const handleLeave = () => {
    setHoveredIndex(null);
  };
  return (
    <div className="@container -mt-28 flex w-full flex-col gap-8 px-4 py-16 lg:px-24 lg:py-20">
      <Title className="mt-28 text-center text-white">
        {HomePageData?.impact?.title || "OUR IMPACT"}
      </Title>
      <ul className="layout mt-6 flex w-full flex-wrap justify-center gap-7">
        {HomePageData?.impact?.metrics?.map((item, index) => (
          <ImpactCard
            item={item}
            key={index}
            isFirst={index === 0 && hoveredIndex === null}
            isHovered={hoveredIndex === index}
            onHover={handleHover(index)}
            onLeave={handleLeave}
          />
        ))}
      </ul>
    </div>
  );
}
