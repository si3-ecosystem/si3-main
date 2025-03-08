import { CtaVideoSection } from "./CtaVideoSection";

export function FooterBanner() {
  return (
    <div>
      <CtaVideoSection
        videoSrc="/videos/SiUScholars.mp4"
        title="Explore & Expand"
        ctaLink="/"
        ctaTitle="Join Now"
        showGradient={true}
      />
    </div>
  );
}
