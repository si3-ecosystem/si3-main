import { CreatingTheNewEconomy } from "@/components/organisms/home/CreatingTheNewEconomy";
import { FooterBanner } from "@/components/organisms/home/FooterBanner";
import { OurCommunity } from "@/components/organisms/home/OurCommunity";
import { OurImpact } from "@/components/organisms/home/OurImpact";
import { OurPathways } from "@/components/organisms/home/OurPathways";

export default function page() {
  return (
    <section>
      <OurImpact />
      <OurPathways />
      <OurCommunity />
      <CreatingTheNewEconomy />
      <FooterBanner />
    </section>
  );
}
