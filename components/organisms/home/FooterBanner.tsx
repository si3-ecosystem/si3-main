"use client";

import { useAppSelector } from "@/redux/store";
import { CtaVideoSection } from "./CtaVideoSection";
import { useQuery } from "@tanstack/react-query";
import {
  getGuidesData,
  getPartnersData,
  getScholarsData,
} from "@/lib/sanity/client";

interface VideoContent {
  videoSrc: string;
  title: string;
  ctaLink: string;
  ctaTitle: string;
  showGradient?: boolean;
}

const defaultContent = {
  videoSrc: "/videos/connectionformat.mp4",
  title: "Explore & Expand",
  ctaLink: "/scholars",
  ctaTitle: "Join Scholars",
  showGradient: true,
};

export function FooterBanner() {
  const activeValue = useAppSelector(
    (state) => state.community.activeAccordionValue,
  );

  const { data, isLoading, error } = useQuery({
    queryKey: ["footer-video", activeValue],
    queryFn: async () => {
      const [scholarsData, guidesData, partnersData] = await Promise.all([
        getScholarsData(),
        getGuidesData(),
        getPartnersData(),
      ]);
      return { scholarsData, guidesData, partnersData };
    },
  });

  let content: VideoContent = defaultContent;

  if (data) {
    switch (activeValue) {
      case "si_u_scholars":
        content = {
          videoSrc: data.scholarsData.video.videoUrl,
          title: data.scholarsData.video.title,
          ctaLink: data.scholarsData.video.ctaLink,
          ctaTitle: data.scholarsData.video.ctaTitle,
          showGradient: true,
        };
        break;
      case "si_her_guides":
        content = {
          videoSrc: data.guidesData.video.videoUrl,
          title: data.guidesData.video.title,
          ctaLink: data.guidesData.video.ctaLink,
          ctaTitle: data.guidesData.video.ctaTitle,
          showGradient: true,
        };
        break;
      case "si_partners":
        content = {
          videoSrc: data.partnersData.video.videoUrl,
          title: data.partnersData.video.title,
          ctaLink: data.partnersData.video.ctaLink,
          ctaTitle: data.partnersData.video.ctaTitle,
          showGradient: true,
        };
        break;
      default:
        content = defaultContent;
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error fetching footer video data:", error);
    return <div>Error loading video content</div>;
  }

  return (
    <div>
      <CtaVideoSection
        videoSrc={content.videoSrc}
        title={content.title}
        ctaTitle={content.ctaTitle}
        showGradient={content.showGradient || true}
      />
    </div>
  );
}
