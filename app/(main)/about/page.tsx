import { Loader } from "@/components/atoms/Loader";
import { AnimatedHands } from "@/components/organisms/about/AnimatedHands";
import { HeroSection } from "@/components/organisms/about/HeroSection";
import { ParallaxGallery } from "@/components/organisms/about/ParallaxGallery";
import { Timeline } from "@/components/organisms/about/TimeLine";
import { TopTestimonial } from "@/components/organisms/about/TopTestimonial";
import { CtaVideoSection } from "@/components/organisms/home/CtaVideoSection";
import { getAboutPageData } from "@/lib/sanity/client";
import { AboutQuery } from "@/types/about";
import { Suspense } from "react";

export default async function AboutPage() {
  const data: AboutQuery = await getAboutPageData();

  return (
    <Suspense fallback={<Loader />}>
      <HeroSection data={data} />
      <TopTestimonial data={data.testimonial} />
      <AnimatedHands />
      <ParallaxGallery teamMembers={data.members || []} />
      <Timeline items={data.timeline} />
      <CtaVideoSection
        videoSrc={data.video.videoUrl}
        title={data.video.title || ""}
        ctaTitle={data.video.ctaTitle}
        showGradient={true}
      />
    </Suspense>
  );
}
