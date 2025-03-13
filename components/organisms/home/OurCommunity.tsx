import { CommunityAccordion } from "@/components/molecules/accordions/CommunityAccordion";
import { SiUScholarsWrapper } from "./scholars/SiUScholarsWrapper";
import { SiHerGuidesWrapper } from "./guides/SiHerGuidesWrapper";
import { SiPartnersWrapper } from "./siPartners/SiPartnersWrapper";
import {
  getScholarsData,
  getGuidesData,
  getPartnersData,
} from "@/lib/sanity/client";
import { Suspense } from "react";
import { Spinner } from "@/components/atoms/Spinner";

export async function OurCommunity() {
  const [scholarsData, guidesData, partnersData] = await Promise.all([
    getScholarsData(),
    getGuidesData(),
    getPartnersData(),
  ]);

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
        <Suspense
          fallback={
            <div className="flex h-[400px] w-full items-center justify-center">
              <Spinner />
            </div>
          }
        >
          <CommunityAccordion
            renderItems={accordionData}
            defaultValue="si_u_scholars"
          />
        </Suspense>
      </div>
      <div className="communityBottom absolute right-0 bottom-8 left-0 !-z-10 h-full max-h-[946.481px]"></div>
    </section>
  );
}
