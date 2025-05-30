import { Loader } from "@/components/atoms/Loader";
import { HeroSection } from "@/components/organisms/about/HeroSection";
import { ParallaxGallery } from "@/components/organisms/about/ParallaxGallery";
import { Timeline } from "@/components/organisms/about/TimeLine";
import { TopTestimonial } from "@/components/organisms/about/TopTestimonial";
import { WomenOfWeb3Banner } from "@/components/organisms/about/WomenOfWeb3Banner";
import { CtaVideoSection } from "@/components/organisms/home/CtaVideoSection";
import { getAboutPageData } from "@/lib/sanity/client";
import { urlForImage } from "@/lib/sanity/image";
import { AboutQuery } from "@/types/about";
import { Suspense } from "react";

export default async function AboutPage() {
  const data: AboutQuery = await getAboutPageData();

  const topRowTerms = data.educationPartners.map((partner) => partner.name);
  const bottomRowTerms = data.communityPartners.map((partner) => partner.name);

  const gifUrl = data?.tickerGif?.url || "";
  const placeholderUrl =
    data?.tickerGif?.placeholderImage &&
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    urlForImage(data?.tickerGif?.placeholderImage).src;

  const purposeTexts = data.purpose_texts?.map((item) => item.text) || [];

  return (
    <Suspense fallback={<Loader />}>
      <HeroSection data={data} />
      <TopTestimonial data={data.testimonial} />
      <WomenOfWeb3Banner
        topRowTerms={topRowTerms}
        bottomRowTerms={bottomRowTerms}
        gifUrl={gifUrl}
        purposeTexts={purposeTexts}
        placeholderUrl={placeholderUrl}
      />
      <ParallaxGallery teamMembers={data.members || []} />
      <Timeline items={data.timeline} />
      <CtaVideoSection
        videoSrc={data.video.videoUrl}
        title={data.video.title || ""}
        ctaTitle={data.video.ctaTitle}
        ctaLink={data.video.ctaLink}
        showGradient={true}
        isLink={true}
      />
    </Suspense>
  );
}
