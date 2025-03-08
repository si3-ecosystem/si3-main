import ContentCard from "@/components/molecules/content-grid";
import Link from "next/link";

export function CreatingTheNewEconomy() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-16 lg:px-24 lg:py-24">
      <ContentCard
        title="CO-CREATING THE NEW ECONOMY"
        description="We are emerging tech professionals aligned on a mission for equitable, accessible and collaborative systems. Our global team and collaborators represents the diversity of experiences and cultures we embrace."
        image={{
          src: "/icons/webp/neweconomyimage.webp",
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
