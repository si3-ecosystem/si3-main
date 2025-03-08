"use client";

import ContentCard from "@/components/molecules/content-grid";
import { useWindowSize } from "@/hooks/layout/useWindowSize";
import Link from "next/link";

export function CreatingTheNewEconomy() {
  const { width } = useWindowSize();

  const imageSrc =
    width < 1024
      ? "/icons/webp/pathwayMobile.webp"
      : "/icons/webp/pathwayDesktop.webp";

  return (
    <section className="mx-auto w-full py-16 lg:py-24">
      <ContentCard
        title="CO-CREATING THE NEW ECONOMY"
        description="We are emerging tech professionals aligned on a mission for equitable, accessible and collaborative systems. Our global team and collaborators represents the diversity of experiences and cultures we embrace."
        image={{
          src: imageSrc,
          alt: "Pathways illustration",
          width: 1532,
          height: 862,
        }}
        button={{
          ctaText: "Learn More",
          link: "/about",
          ariaLabel: "Learn more about us",
          as: Link,
          showGradient: true,
        }}
        className="h-full w-full"
      />
    </section>
  );
}
