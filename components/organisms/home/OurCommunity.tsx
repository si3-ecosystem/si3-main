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
    <section className="mx-auto mt-4 w-full max-w-[1440px] py-14 lg:px-24">
      <CommunityAccordion
        renderItems={accordionData}
        defaultValue="si_u_scholars"
      />
    </section>
  );
}
