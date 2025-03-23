import React from "react";

import { ContentCard } from "@/components/molecules/cards/ContentCard";
import Link from "next/link";
import { AboutIntroData } from "@/types/home";
import { urlForImage } from "@/lib/sanity/image";

type Props = {
  aboutIntroData: AboutIntroData;
};

export function CreatingTheNewEconomy({ aboutIntroData }: Props) {
  const imageUrl = aboutIntroData.image
    ? urlForImage(aboutIntroData.image)?.src
    : "/icons/webp/neweconomyimage.webp";
  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-16 lg:px-24 lg:py-24">
      <ContentCard
        title={aboutIntroData.title}
        description={aboutIntroData.description}
        image={{
          mobileSrc: imageUrl || "/icons/webp/neweconomyimage.webp",
          desktopSrc: imageUrl || "/icons/webp/neweconomyimage.webp",
          alt: aboutIntroData.title || "creating new economy ",
          width: 1532,
          height: 862,
        }}
        button={{
          ctaText: aboutIntroData.ctaText,
          link: aboutIntroData.ctaLink,
          ariaLabel: "Learn more about us",
          as: Link,
          showGradient: true,
        }}
        className="h-full w-full border-none bg-transparent outline-none"
      />
    </section>
  );
}
