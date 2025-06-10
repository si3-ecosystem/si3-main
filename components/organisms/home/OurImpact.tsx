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
      <ul className="mx-auto mt-6 grid w-full max-w-[1124px] grid-cols-1 place-content-center place-items-center justify-center gap-5 px-4 sm:grid-cols-2 md:grid-cols-4">
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
