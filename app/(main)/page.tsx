import { OurImpact } from "@/components/organisms/home/OurImpact";
import { OurPathways } from "@/components/organisms/home/OurPathways";
import { FooterBanner } from "@/components/organisms/home/FooterBanner";
import { OurCommunity } from "@/components/organisms/home/OurCommunity";
import HeaderContainer from "@/components/organisms/home/header/HeaderContainer";
import { CreatingTheNewEconomy } from "@/components/organisms/home/CreatingTheNewEconomy";
import {
  getGuidesData,
  getPartnersData,
  getScholarsData,
} from "@/lib/sanity/client";
import { Suspense } from "react";
import { Spinner } from "@/components/atoms/Spinner";
import { Loader } from "@/components/atoms/Loader";

export default async function HomePage() {
  const [scholarsData, guidesData, partnersData] = await Promise.all([
    getScholarsData(),
    getGuidesData(),
    getPartnersData(),
  ]);

  return (
    <Suspense fallback={<Loader />}>
      <HeaderContainer />
      <OurImpact />
      <OurPathways />
      <Suspense fallback={<Spinner />}>
        <OurCommunity
          scholarsData={scholarsData}
          guidesData={guidesData}
          partnersData={partnersData}
        />
      </Suspense>
      <CreatingTheNewEconomy />
      <FooterBanner />
    </Suspense>
  );
}
