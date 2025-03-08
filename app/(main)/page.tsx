import { CreatingTheNewEconomy } from "@/components/organisms/home/CreatingTheNewEconomy";
import { CtaVideoSection } from "@/components/organisms/home/CtaVideoSection";
import { OurImpact } from "@/components/organisms/home/OurImpact";
import { OurPathways } from "@/components/organisms/home/OurPathways";

export default function page() {
  return (
    <section>
      <OurImpact />
      <OurPathways />
      <CreatingTheNewEconomy />
      <CtaVideoSection />
    </section>
  );
}
