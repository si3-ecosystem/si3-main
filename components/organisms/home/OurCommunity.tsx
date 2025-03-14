"use client";

import { SiUScholarsWrapper } from "./scholars/SiUScholarsWrapper";
import { SiHerGuidesWrapper } from "./guides/SiHerGuidesWrapper";
import { SiPartnersWrapper } from "./siPartners/SiPartnersWrapper";
import dynamic from "next/dynamic";
import { GuidesData, PartnersData, ScholarsData } from "@/types/home";

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
  const accordionData = [
    {
      title: scholarsData?.title || "Si U Scholars",
      value: "si_u_scholars",
      sub: scholarsData?.description || "Learn the basics of Web3 technology",
      background: "/icons/jpg/si_u_scholars_tab_background.jpg",
      section: <SiUScholarsWrapper data={scholarsData} />,
    },
    {
      title: guidesData?.title || "Si Her Guides",
      value: "si_her_guides",
      sub: guidesData?.description || "Meet our collaborators",
      background: "/icons/jpg/si_her_guides_background.jpg",
      section: <SiHerGuidesWrapper data={guidesData} />,
    },
    {
      title: partnersData?.title || "SI<3> PARTNERS",
      value: "si_partners",
      sub: partnersData?.description || "",
      background: "/icons/jpg/si_partners_background.jpg",
      section: <SiPartnersWrapper data={partnersData} />,
    },
  ];

  return (
    <section className="relative mt-4 w-full">
      <div className="communitytop absolute top-32 right-0 left-0 !-z-10 h-full max-h-[218.467px]"></div>
      <div className="!z-20 mx-auto max-w-[1440px] py-14 lg:px-24">
        <CommunityAccordion
          renderItems={accordionData}
          defaultValue="si_u_scholars"
        />
      </div>
      <div className="communityBottom absolute right-0 bottom-8 left-0 !-z-10 h-full max-h-[946.481px]"></div>
    </section>
  );
}
