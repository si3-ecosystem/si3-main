import { CreatingTheNewEconomy } from "@/components/organisms/home/creating-the-new-economy";
import { OurImpact } from "@/components/organisms/home/impact";
import { OurPathways } from "@/components/organisms/home/pathways";
import React from "react";

export default function HomeTemplate() {
  return (
    <section>
      <OurImpact />
      <OurPathways />
      <CreatingTheNewEconomy />
    </section>
  );
}
