import { CreatingTheNewEconomy } from "@/components/organisms/home/creating-the-new-economy";
import { CtaVideoSection } from "@/components/organisms/home/cta-footer";
import { OurImpact } from "@/components/organisms/home/impact";
import { OurPathways } from "@/components/organisms/home/pathways";
import React from "react";

export default function HomeTemplate() {
  return (
    <section>
      <OurImpact />
      <OurPathways />
      <CreatingTheNewEconomy />
      <CtaVideoSection />
    </section>
  );
}
