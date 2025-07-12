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

// Generate metadata for the home page
export async function generateMetadata(): Promise<Metadata> {
  return await processMetadata({
    title: "SI<3> Ecosystem - Empowering Women & Non-Binary Leaders in Web3",
    description:
      "Co-activating growth and financial inclusion opportunities for women and non-binary web3 leaders through personal brand development, public speaking, partnerships, and DeFi.",
    keywords: [
      "si3",
      "si/her",
      "web3",
      "blockchain",
      "cryptocurrency",
      "women in tech",
      "diversity",
      "inclusion",
      "defi",
      "personal branding",
      "leadership",
      "financial inclusion",
      "web3 education",
      "blockchain education",
      "women empowerment",
      "non-binary",
      "tech diversity",
      "crypto education",
    ],
  });
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

    // Safely process placeholder image for ticker gif
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
        // Remove the problematic image reference
        delete aboutPageData.tickerGif.placeholderImage;
      }
    }

    // Generate FAQ structured data if available
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
        {/* Performance monitoring */}
        <WebVitals />
        <PageLoadTracker pageName="Home" />

        {/* Structured data for SEO */}
        {faqStructuredData}

        {/* Main content */}
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

    // Return a fallback error page or redirect
    throw new Error("Failed to load page data. Please try again later.");
  }
}
