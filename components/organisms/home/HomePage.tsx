"use client";

import React, { Suspense, memo, lazy } from "react";
import { ErrorBoundary } from "@/components/atoms/ErrorBoundary";
import { InitialLoader } from "@/components/atoms/InitialLoader";
import HeaderContainer from "@/components/organisms/home/header/HeaderContainer";
import {
  HomepageSchema,
  ScholarsData,
  GuidesData,
  PartnersData,
} from "@/types/home";
import { OnboardSchema } from "@/types/onboard";
import { AboutIntroData } from "@/types/home";

// Lazy load heavy components for better performance
const Web3UniversitySection = lazy(() =>
  import(
    "@/components/organisms/home/web3-university/Web3UniversitySection"
  ).then((module) => ({
    default: module.Web3UniversitySection,
  })),
);

const OurImpact = lazy(() =>
  import("@/components/organisms/home/OurImpact").then((module) => ({
    default: module.OurImpact,
  })),
);

const WomenOfWeb3Banner = lazy(() =>
  import("@/components/organisms/about/WomenOfWeb3Banner").then((module) => ({
    default: module.WomenOfWeb3Banner,
  })),
);

const FaqSection = lazy(() =>
  import("@/components/organisms/home/FaqSection").then((module) => ({
    default: module.FaqSection,
  })),
);

const CreatingTheNewEconomy = lazy(() =>
  import("@/components/organisms/home/CreatingTheNewEconomy").then(
    (module) => ({
      default: module.CreatingTheNewEconomy,
    }),
  ),
);

// Enhanced TypeScript interfaces for better type safety
interface EducationPartner {
  readonly name: string;
  readonly id?: string;
}

interface CommunityPartner {
  readonly name: string;
  readonly id?: string;
}

interface TickerGif {
  readonly url: string;
  readonly placeholderImage?: {
    readonly src: string;
    readonly alt?: string;
  };
}

interface PurposeText {
  readonly text: string;
  readonly id?: string;
}

interface AboutPageData {
  readonly educationPartners: readonly EducationPartner[];
  readonly communityPartners: readonly CommunityPartner[];
  readonly tickerGif?: TickerGif;
  readonly purpose_texts?: readonly PurposeText[];
}

interface HomePageProps {
  readonly HomePageData: HomepageSchema;
  readonly scholarsData: ScholarsData;
  readonly guidesData: GuidesData;
  readonly partnersData: PartnersData;
  readonly aboutIntroData: AboutIntroData;
  readonly onboardData: OnboardSchema;
  readonly aboutPageData: AboutPageData;
}

// Loading component for better UX
const SectionLoader = memo(() => (
  <div className="flex h-32 items-center justify-center">
    <div className="border-t-primary h-8 w-8 animate-spin rounded-full border-4 border-gray-300"></div>
  </div>
));
SectionLoader.displayName = "SectionLoader";

// Memoized HomePage component for better performance
export const HomePage = memo<HomePageProps>(function HomePage({
  HomePageData,
  scholarsData,
  guidesData,
  partnersData,
  aboutIntroData,
  onboardData,
  aboutPageData,
}) {
  // Memoized computed values to prevent unnecessary recalculations
  const topRowTerms = React.useMemo(
    () => aboutPageData.educationPartners.map((partner) => partner.name),
    [aboutPageData.educationPartners],
  );

  const bottomRowTerms = React.useMemo(
    () => aboutPageData.communityPartners.map((partner) => partner.name),
    [aboutPageData.communityPartners],
  );

  const gifUrl = aboutPageData?.tickerGif?.url || "";
  const placeholderUrl =
    typeof aboutPageData?.tickerGif?.placeholderImage === "string"
      ? aboutPageData.tickerGif.placeholderImage
      : aboutPageData?.tickerGif?.placeholderImage?.src;

  const purposeTexts = React.useMemo(
    () => aboutPageData.purpose_texts?.map((item) => item.text) || [],
    [aboutPageData.purpose_texts],
  );

  const pageContent = (
    <>
      {/* Header Section - Always visible */}
      <ErrorBoundary fallback={<div className="h-20 bg-gray-100" />}>
        <HeaderContainer HomePageData={HomePageData} />
      </ErrorBoundary>

      {/* Web3 University Section */}
      <ErrorBoundary fallback={<SectionLoader />}>
        <div id="si-u" className="@container w-full max-lg:bg-white">
          <Suspense fallback={<SectionLoader />}>
            <Web3UniversitySection
              data={onboardData}
              scholarsData={scholarsData}
              guidesData={guidesData}
              partnersData={partnersData}
            />
          </Suspense>
        </div>
      </ErrorBoundary>

      {/* Impact Section with gradient background */}
      <ErrorBoundary fallback={<SectionLoader />}>
        <section
          id="impact"
          style={{
            background:
              "linear-gradient(121deg, #211257 5.49%, #4C1192 48.19%, #790EB4 75.74%, #8A04C5 86.22%)",
          }}
          className="relative z-0"
          aria-label="Our Impact and Community"
        >
          <Suspense fallback={<SectionLoader />}>
            <OurImpact HomePageData={HomePageData} />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <WomenOfWeb3Banner
              topRowTerms={topRowTerms}
              bottomRowTerms={bottomRowTerms}
              gifUrl={gifUrl}
              purposeTexts={purposeTexts}
              placeholderUrl={placeholderUrl}
              textColor="white"
            />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <FaqSection
              faqTitle={HomePageData?.faqTitle}
              faqs={HomePageData?.faqs}
            />
          </Suspense>
        </section>
      </ErrorBoundary>

      {/* Creating The New Economy Section */}
      <ErrorBoundary fallback={<SectionLoader />}>
        <Suspense fallback={<SectionLoader />}>
          <CreatingTheNewEconomy
            aboutIntroData={aboutIntroData}
            thoughtLeadership={HomePageData.thoughtLeadership}
            thoughtLeadershipTitle={HomePageData.thoughtLeadershipTitle}
          />
        </Suspense>
      </ErrorBoundary>
    </>
  );

  return <InitialLoader>{pageContent}</InitialLoader>;
});
