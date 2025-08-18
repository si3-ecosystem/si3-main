import { Metadata } from "next";
import {
  getAboutIntroData,
  getAboutPageData,
  getGuidesData,
  getHomePageData,
  getPartnersData,
  getScholarsData,
  getOnboardPageData,
} from "@/lib/sanity/client";
import { HomePage } from "@/components/organisms/home/HomePage";
import { urlForImage } from "@/lib/sanity/image";
import { processMetadata } from "@/utils/sharedMetadata";
import { FAQStructuredData } from "@/components/atoms/StructuredData";
import { WebVitals, PageLoadTracker } from "@/components/atoms/WebVitals";
import { AnalyticsWrapper } from "@/components/AnalyticsWrapper";

export async function generateMetadata(): Promise<Metadata> {
  return await processMetadata();
}

export default async function Home() {
  try {
    const [
      HomePageData,
      scholarsData,
      guidesData,
      partnersData,
      aboutIntroData,
      onboardData,
      aboutPageData,
    ] = await Promise.all([
      getHomePageData(),
      getScholarsData(),
      getGuidesData(),
      getPartnersData(),
      getAboutIntroData(),
      getOnboardPageData(),
      getAboutPageData(),
    ]);

    if (aboutPageData?.tickerGif?.placeholderImage) {
      try {
        const processedImage = urlForImage(
          aboutPageData.tickerGif.placeholderImage,
        );
        if (processedImage?.src) {
          aboutPageData.tickerGif.placeholderImage = processedImage.src;
        }
      } catch (error) {
        console.warn("Failed to process ticker gif placeholder image:", error);
        delete aboutPageData.tickerGif.placeholderImage;
      }
    }

    const faqStructuredData =
      HomePageData?.faqs?.length > 0 ? (
        <FAQStructuredData
          faqs={HomePageData.faqs.map((faq) => ({
            question: faq.question || "",
            answer: faq.answer || "",
          }))}
        />
      ) : null;

    return (
      <>
        <WebVitals />
        <PageLoadTracker pageName="Home" />

        {faqStructuredData}

        <AnalyticsWrapper />

        <HomePage
          HomePageData={HomePageData}
          scholarsData={scholarsData}
          guidesData={guidesData}
          partnersData={partnersData}
          aboutIntroData={aboutIntroData}
          onboardData={onboardData}
          aboutPageData={aboutPageData}
        />
      </>
    );
  } catch (error) {
    console.error("Error loading home page data:", error);

    throw new Error("Failed to load page data. Please try again later.");
  }
}
