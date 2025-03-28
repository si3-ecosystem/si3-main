import { ContentCard } from "@/components/molecules/cards/ContentCard";

export function OurPathways() {
  return (
    <div id="pathways" className="pt-8 pb-14 lg:pt-14 lg:pb-20">
      <ContentCard
        title="Our Pathways"
        description="Discover our three paths to join into our ecosystem and expand your potential."
        isFullScreenView={true}
        image={{
          mobileSrc: "/icons/jpg/pathwayMobile.jpg",
          desktopSrc: "/icons/jpg/pathwayDesktop.jpg",
          alt: "Pathways illustration",
          width: 1532,
          height: 862,
        }}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
