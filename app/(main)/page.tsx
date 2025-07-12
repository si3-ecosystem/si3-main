import {
  getAboutIntroData,
  getAboutPageData,
  getGuidesData,
  getHomePageData,
  getPartnersData,
  getScholarsData,
  getOnboardPageData
} from "@/lib/sanity/client";
import { HomePage } from "@/components/organisms/home/HomePage";
import { urlForImage } from "@/lib/sanity/image";

export default async function Home() {
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

  // Process placeholder image for ticker gif
  if (aboutPageData?.tickerGif?.placeholderImage) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    aboutPageData.tickerGif.placeholderImage = urlForImage(aboutPageData.tickerGif.placeholderImage).src;
  }

  return (
    <HomePage
      HomePageData={HomePageData}
      scholarsData={scholarsData}
      guidesData={guidesData}
      partnersData={partnersData}
      aboutIntroData={aboutIntroData}
      onboardData={onboardData}
      aboutPageData={aboutPageData}
    />
  );
}
