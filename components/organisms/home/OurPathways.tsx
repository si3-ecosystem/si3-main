import ContentCard from "@/components/molecules/cards/ContentCard";
export function OurPathways() {
  return (
    <div>
      <ContentCard
        title="Our Pathways"
        description="Discover our three paths to join into our ecosystem and expand your potential."
        isFullScreenView={true}
        image={{
          mobileSrc: "/icons/webp/pathwayMobile.webp",
          desktopSrc: "/icons/webp/pathwayDesktop.webp",
          alt: "Pathways illustration",
          width: 1532,
          height: 862,
        }}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
