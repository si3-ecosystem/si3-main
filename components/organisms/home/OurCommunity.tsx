"use client";

import { SiUScholarsWrapper } from "./scholars/SiUScholarsWrapper";
import { SiHerGuidesWrapper } from "./guides/SiHerGuidesWrapper";
import { SiPartnersWrapper } from "./siPartners/SiPartnersWrapper";
import dynamic from "next/dynamic";
import { GuidesData, PartnersData, ScholarsData } from "@/types/home";
import { urlForImage } from "@/lib/sanity/image";
import Image from "next/image";

const CommunityAccordion = dynamic(
  () =>
    import("@/components/molecules/accordions/CommunityAccordion").then(
      (mod) => mod.CommunityAccordion,
    ),
  { ssr: false },
);

type Props = {
  scholarsData: ScholarsData;
  guidesData: GuidesData;
  partnersData: PartnersData;
};

export function OurCommunity({
  scholarsData,
  guidesData,
  partnersData,
}: Props) {
  const getImageUrl = (image) => {
    return urlForImage(image)?.src || null;
  };

  const accordionData = [
    {
      title: scholarsData?.title || "Si U Scholars",
      value: "si_u_scholars",
      sub: scholarsData?.description || "Learn the basics of Web3 technology",
      background:
        getImageUrl(scholarsData.image) ||
        "/icons/jpg/si_u_scholars_tab_background.jpg",
      section: <SiUScholarsWrapper data={scholarsData} />,
    },
    {
      title: guidesData?.title || "Si Her Guides",
      value: "si_her_guides",
      sub: guidesData?.description || "Meet our collaborators",
      background:
        getImageUrl(guidesData.image) ||
        "/icons/jpg/si_her_guides_background.jpg",
      section: <SiHerGuidesWrapper data={guidesData} />,
    },
    {
      title: partnersData?.title || "SI<3> PARTNERS",
      value: "si_partners",
      sub: partnersData?.description || "",
      background:
        getImageUrl(partnersData.image) ||
        "/icons/jpg/si_partners_background.jpg",
      section: <SiPartnersWrapper data={partnersData} />,
    },
  ];

  return (
    <section className="relative w-full">
      <div className="pt10 !z-20 mx-auto max-w-[1440px] py-14 pt-10 lg:px-24">
        <CommunityAccordion
          renderItems={accordionData}
          defaultValue="si_u_scholars"
        />
      </div>
      <Image
        src={"/home/communityaccordionbg.jpg"}
        alt="communitybg"
        fill
        className="-z-10 h-full w-full object-cover object-center"
      />
    </section>
  );
}
