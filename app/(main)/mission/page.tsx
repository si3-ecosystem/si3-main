import { Loader } from "@/components/atoms/Loader";
import { HeroSection } from "@/components/organisms/about/HeroSection";
import { ParallaxGallery } from "@/components/organisms/about/ParallaxGallery";
import { Timeline } from "@/components/organisms/about/TimeLine";
import { TopTestimonial } from "@/components/organisms/about/TopTestimonial";
import { CtaVideoSection } from "@/components/organisms/home/CtaVideoSection";
import { getAboutPageData } from "@/lib/sanity/client";
import { AboutQuery } from "@/types/about";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Our Mission | SI<3> Ecosystem",
  description:
    "Discover our mission to co-activate growth and financial inclusion opportunities for women and non-binary web3 leaders.",
  openGraph: {
    title: "Our Mission | SI<3> Ecosystem",
    description:
      "Discover our mission to co-activate growth and financial inclusion opportunities for women and non-binary web3 leaders.",
    images: [
      {
        url: "/mission.png",
        width: 1200,
        height: 630,
        alt: "SI<3> Mission - Empowering Women and Non-Binary Leaders in Web3",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Mission | SI<3> Ecosystem",
    description:
      "Discover our mission to co-activate growth and financial inclusion opportunities for women and non-binary web3 leaders.",
    images: ["/mission.png"],
  },
};

export default async function MissionPage() {
  const data: AboutQuery = await getAboutPageData();

  const pageContent = (
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

  return pageContent;
}
