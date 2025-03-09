import { OurImpact } from "@/components/organisms/home/OurImpact";
import { OurPathways } from "@/components/organisms/home/OurPathways";
import { FooterBanner } from "@/components/organisms/home/FooterBanner";
import { OurCommunity } from "@/components/organisms/home/OurCommunity";
import HeaderContainer from "@/components/organisms/home/header/HeaderContainer";
import { CreatingTheNewEconomy } from "@/components/organisms/home/CreatingTheNewEconomy";

export default function page() {
  return (
    <section>
      <HeaderContainer />
      <OurImpact />
      <OurPathways />
      <OurCommunity />
      <CreatingTheNewEconomy />
      <FooterBanner />
    </section>
  );
}
