import { CommunityAccordion } from "@/components/molecules/accordions/CommunityAccordion";
import { SiUScholarsWrapper } from "./siUScholars/SiUScholarsWrapper";

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
    section: (
      <ul className="list-disc pl-5">
        <li>Partner A: Focused on blockchain education</li>
        <li>Partner B: Building decentralized apps</li>
        <li>Partner C: Supporting Web3 startups</li>
      </ul>
    ),
  },
  {
    title: "SI<3> PARTNERS",
    value: "si_partners",
    background: "/icons/jpg/si_partners_background.jpg",
    section: (
      <div>
        <p>
          Become a part of our growing Web3 community! Connect with like-minded
          individuals, collaborate on projects, and stay updated on the latest
          trends in decentralized technology.
        </p>
        <a href="/join" className="text-blue-500 underline">
          Join Now
        </a>
      </div>
    ),
  },
];

export function OurCommunity() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-14 lg:px-24">
      <CommunityAccordion
        renderItems={accordionData}
        defaultValue="si_u_scholars"
      />
    </section>
  );
}
