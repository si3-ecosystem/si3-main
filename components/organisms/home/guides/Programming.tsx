"use client";

import { ProgrammingCard } from "@/components/molecules/cards/ProgrammingCard";
import { PartialContentCarousel } from "@/components/molecules/carousels/PartialContentCarousel";
import { GuidesData } from "@/types/home";
import React from "react";

type Props = {
  data: GuidesData;
};

export function Programming({ data }: Props) {
  return (
    <div className="w-full py-14 lg:py-20">
      <PartialContentCarousel
        autoplay={true}
        autoplayInterval={3500}
        title={data.programming_title}
        description={data.programming_description}
        items={data.programming}
        renderItem={(item, key) => (
          <ProgrammingCard
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
