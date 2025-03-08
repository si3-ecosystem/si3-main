"use client";

import ContentCard from "@/components/molecules/content-grid";
import { useWindowSize } from "@/hooks/layout/useWindowSize";
export function OurPathways() {
  const { width } = useWindowSize();

  const imageSrc =
    width < 1024
      ? "/icons/webp/pathwayMobile.webp"
      : "/icons/webp/pathwayDesktop.webp";

  return (
    <div>
      <ContentCard
        title="Our Pathways"
        description="Discover our three paths to join into our ecosystem and expand your potential."
        image={{
          src: imageSrc,
          alt: "Pathways illustration",
          width: 1532,
          height: 862,
        }}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
