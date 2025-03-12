"use client";

import { useAppSelector } from "@/redux/store";
import { CtaVideoSection } from "./CtaVideoSection";

const contentMapping: Record<
  string,
  {
    videoSrc: string;
    title: string;
    ctaLink: string;
    ctaTitle: string;
    showGradient?: boolean;
  }
> = {
  si_u_scholars: {
    videoSrc: "/videos/SiUScholars.mp4",
    title: "Explore & Expand",
    ctaLink: "/scholars",
    ctaTitle: "Join Scholars",
    showGradient: true,
  },
  si_her_guides: {
    videoSrc: "/videos/SiHerGuides.mp4",
    title: "CO-CREATE & LEAD",
    ctaLink: "/co-active",
    ctaTitle: "Apply Now",
    showGradient: true,
  },
  si_partners: {
    videoSrc: "/videos/SiPartners.mp4",
    title: "INQUIRE WITHIN",
    ctaLink: "/diversity-tracker",
    ctaTitle: "Submit Inquiry",
    showGradient: true,
  },
};

const defaultContent = {
  videoSrc: "/videos/SiUScholars.mp4",
  title: "Explore & Expand",
  ctaLink: "/scholars",
  ctaTitle: "Join Scholars",
  showGradient: true,
};

export function FooterBanner() {
  const activeValue = useAppSelector(
    (state) => state.community.activeAccordionValue,
  );

  const content = contentMapping[activeValue] || defaultContent;

  return (
    <div>
      <CtaVideoSection
        videoSrc={content.videoSrc}
        title={content.title}
        ctaLink={content.ctaLink}
        ctaTitle={content.ctaTitle}
        showGradient={content.showGradient || true}
      />
    </div>
  );
}
