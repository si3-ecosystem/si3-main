import { OurImpact } from "@/components/organisms/home/OurImpact";
import { OurPathways } from "@/components/organisms/home/OurPathways";
import { FooterBanner } from "@/components/organisms/home/FooterBanner";
import { OurCommunity } from "@/components/organisms/home/OurCommunity";
import HeaderContainer from "@/components/organisms/home/header/HeaderContainer";
import { CreatingTheNewEconomy } from "@/components/organisms/home/CreatingTheNewEconomy";
import {
  getAboutIntroData,
  getGuidesData,
  getHomePageData,
  getPartnersData,
  getScholarsData,
} from "@/lib/sanity/client";
import { Suspense } from "react";
import { Spinner } from "@/components/atoms/Spinner";
import { Loader } from "@/components/atoms/Loader";
export default async function HomePage() {
  const [HomePageData, scholarsData, guidesData, partnersData, aboutIntroData] =
    await Promise.all([
      getHomePageData(),
      getScholarsData(),
      getGuidesData(),
      getPartnersData(),
      getAboutIntroData(),
    ]);
  return (
    <Suspense fallback={<Loader />}>
      <HeaderContainer HomePageData={HomePageData} />
      <OurImpact HomePageData={HomePageData} />
      <OurPathways />
      <Suspense fallback={<Spinner />}>
        <OurCommunity
          scholarsData={scholarsData}
          guidesData={guidesData}
          partnersData={partnersData}
        />
      </Suspense>
      <CreatingTheNewEconomy aboutIntroData={aboutIntroData} />
      <FooterBanner />
    </Suspense>
  );
}
