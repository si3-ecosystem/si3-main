import React from "react";

import { ContentCard } from "@/components/molecules/cards/ContentCard";
import Link from "next/link";
import { AboutIntroData, ThoughtLeadership } from "@/types/home";
import { urlForImage } from "@/lib/sanity/image";
import Image from "next/image";
import { ThoughtLeadershipSection } from "./ThoughtLeadership";
import { Title } from "@/components/atoms/title";

type Props = {
  aboutIntroData: AboutIntroData;
  thoughtLeadership: ThoughtLeadership[];
  thoughtLeadershipTitle: string;
};

export function CreatingTheNewEconomy({
  aboutIntroData,
  thoughtLeadership,
  thoughtLeadershipTitle,
}: Props) {
  const imageUrl = aboutIntroData.image
    ? urlForImage(aboutIntroData.image)?.src
    : "/icons/webp/neweconomyimage.webp";
  return (
    <section className="!z-10 -mt-44 w-full rounded-[31px] bg-white lg:rounded-[83px]">
      <div className="layout mt-28 space-y-20 max-lg:px-5 max-lg:py-5 lg:space-y-[87px]">
        <div className="space-y-4 pt-[20px] lg:pt-[48px]">
          <Title className="text-2xl font-normal text-black uppercase lg:text-[36px]">
            {thoughtLeadershipTitle}
          </Title>

          <ThoughtLeadershipSection thoughtLeadership={thoughtLeadership} />
        </div>
        <div className="relative">
          <Image
            src="/home/economybg.svg"
            alt="economybg"
            fill
            className="absolute inset-0 z-0 h-full w-full"
          />
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
            isStatic
            className="h-full w-full border-none bg-transparent outline-none"
          />
        </div>
      </div>
    </section>
  );
}
