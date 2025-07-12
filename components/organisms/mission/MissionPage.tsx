"use client";

import { Suspense } from "react";
import { Loader } from "@/components/atoms/Loader";
import { HeroSection } from "@/components/organisms/about/HeroSection";
import { TopTestimonial } from "@/components/organisms/about/TopTestimonial";
import { ParallaxGallery } from "@/components/organisms/about/ParallaxGallery";
import { Timeline } from "@/components/organisms/about/TimeLine";
import { CtaVideoSection } from "@/components/organisms/home/CtaVideoSection";
import { AboutQuery } from "@/types/about";

interface MissionPageProps {
  data: AboutQuery;
}

export function MissionPage({ data }: MissionPageProps) {
  return (
    <Suspense fallback={<Loader />}>
      <HeroSection data={data} />
      <TopTestimonial data={data.testimonial} />

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