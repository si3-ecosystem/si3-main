import { CommunityAccordion } from "@/components/molecules/accordions/CommunityAccordion";
import { SiUScholarsWrapper } from "./scholars/SiUScholarsWrapper";
import { SiHerGuidesWrapper } from "./guides/SiHerGuidesWrapper";
import { SiPartnersWrapper } from "./siPartners/SiPartnersWrapper";

const accordionData = [
  {
    title: "Si U Scholars",
    value: "si_u_scholars",
    sub: "Learn the basics of Web3 technology",
    background: "/icons/jpg/si_u_scholars_tab_background.jpg",
    section: <SiUScholarsWrapper />,
  },
  {
    title: "Si Her Guides",
    value: "si_her_guides",
    sub: "Meet our collaborators",
    background: "/icons/jpg/si_her_guides_background.jpg",
    section: <SiHerGuidesWrapper />,
  },
  {
    title: "SI<3> PARTNERS",
    value: "si_partners",
    background: "/icons/jpg/si_partners_background.jpg",
    section: <SiPartnersWrapper />,
  },
];

export function OurCommunity() {
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
