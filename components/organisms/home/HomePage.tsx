"use client";

import { Suspense } from "react";
import { InitialLoader } from "@/components/atoms/InitialLoader";
import HeaderContainer from "@/components/organisms/home/header/HeaderContainer";
import { Web3UniversitySection } from "@/components/organisms/home/web3-university/Web3UniversitySection";
import { OurImpact } from "@/components/organisms/home/OurImpact";
import { WomenOfWeb3Banner } from "@/components/organisms/about/WomenOfWeb3Banner";
import { FaqSection } from "@/components/organisms/home/FaqSection";
import { CreatingTheNewEconomy } from "@/components/organisms/home/CreatingTheNewEconomy";
import { HomepageSchema, ScholarsData, GuidesData, PartnersData } from "@/types/home";
import { OnboardSchema } from "@/types/onboard";
import { AboutIntroData } from "@/types/home";

interface HomePageProps {
  HomePageData: HomepageSchema;
  scholarsData: ScholarsData;
  guidesData: GuidesData;
  partnersData: PartnersData;
  aboutIntroData: AboutIntroData;
  onboardData: OnboardSchema;
  aboutPageData: {
    educationPartners: { name: string }[];
    communityPartners: { name: string }[];
    tickerGif?: {
      url: string;
      placeholderImage?: any;
    };
    purpose_texts?: { text: string }[];
  };
}

export function HomePage({
  HomePageData,
  scholarsData,
  guidesData,
  partnersData,
  aboutIntroData,
  onboardData,
  aboutPageData,
}: HomePageProps) {
  const topRowTerms = aboutPageData.educationPartners.map((partner) => partner.name);
  const bottomRowTerms = aboutPageData.communityPartners.map((partner) => partner.name);

  const gifUrl = aboutPageData?.tickerGif?.url || "";
  const placeholderUrl = aboutPageData?.tickerGif?.placeholderImage;

  const purposeTexts = aboutPageData.purpose_texts?.map((item) => item.text) || [];

  const pageContent = (
    <Suspense fallback={null}>
      <HeaderContainer HomePageData={HomePageData} />

      <div id="si-u" className="@container w-full max-lg:bg-white">
        <Web3UniversitySection
          data={onboardData}
          scholarsData={scholarsData}
          guidesData={guidesData}
          partnersData={partnersData}
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