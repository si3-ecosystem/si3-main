import { OurImpact } from "@/components/organisms/home/OurImpact";
import HeaderContainer from "@/components/organisms/home/header/HeaderContainer";
import { CreatingTheNewEconomy } from "@/components/organisms/home/CreatingTheNewEconomy";
import {
  getAboutIntroData,
  getAboutPageData,
  getCardsData,
  getGuidesData,
  getHomePageData,
  getPartnersData,
  getScholarsData,
} from "@/lib/sanity/client";
import { Suspense } from "react";
import { Web3UniversitySection } from "@/components/organisms/home/web3-university/Web3UniversitySection";
import { getOnboardPageData } from "@/lib/sanity/client";
import { FaqSection } from "@/components/organisms/home/FaqSection";
// import { CryptoTickerCarousel } from "@/components/organisms/home/CryptoTickerCarousel";
import { InitialLoader } from "@/components/atoms/InitialLoader";
import { WomenOfWeb3Banner } from "@/components/organisms/about/WomenOfWeb3Banner";
import { urlForImage } from "@/lib/sanity/image";

export default async function HomePage() {
  const [
    HomePageData,
    cardsData,
    scholarsData,
    guidesData,
    partnersData,
    aboutIntroData,
    onboardData,
    data,
  ] = await Promise.all([
    getHomePageData(),
    getCardsData(),
    getScholarsData(),
    getGuidesData(),
    getPartnersData(),
    getAboutIntroData(),
    getOnboardPageData(),
    getAboutPageData(),
  ]);

  const topRowTerms = data.educationPartners.map((partner) => partner.name);
  const bottomRowTerms = data.communityPartners.map((partner) => partner.name);

  const gifUrl = data?.tickerGif?.url || "";
  const placeholderUrl =
    data?.tickerGif?.placeholderImage &&
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    urlForImage(data?.tickerGif?.placeholderImage).src;

  const purposeTexts = data.purpose_texts?.map((item) => item.text) || [];

  const pageContent = (
    <Suspense fallback={null}>
      <HeaderContainer HomePageData={HomePageData} />

      <div id="si-u" className="@container w-full max-lg:bg-white">
        <Web3UniversitySection
          data={onboardData}
          scholarsData={scholarsData}
          guidesData={guidesData}
          partnersData={partnersData}
          cardsData={cardsData}
        />
      </div>
      <section
        id="impact"
        style={{
          background:
            "linear-gradient(121deg, #211257 5.49%, #4C1192 48.19%, #790EB4 75.74%, #8A04C5 86.22%)",
        }}
        className="!z-0"
      >
        <OurImpact HomePageData={HomePageData} />
        <WomenOfWeb3Banner
          topRowTerms={topRowTerms}
          bottomRowTerms={bottomRowTerms}
          gifUrl={gifUrl}
          purposeTexts={purposeTexts}
          placeholderUrl={placeholderUrl}
          textColor={"white"}
        />
        <FaqSection
          faqTitle={HomePageData?.faqTitle}
          faqs={HomePageData?.faqs}
        />
      </section>
      <CreatingTheNewEconomy
        aboutIntroData={aboutIntroData}
        thoughtLeadership={HomePageData.thoughtLeadership}
        thoughtLeadershipTitle={HomePageData.thoughtLeadershipTitle}
      />
    </Suspense>
  );

  return <InitialLoader>{pageContent}</InitialLoader>;
}
