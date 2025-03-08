import { VideoCarousel } from "@/components/molecules/carousels/videoCarousel";
import { HeroSection } from "./HeroSection";
import { SiHerKollab } from "./siHerKollab";

const carouselItems = [
  {
    title: "cryptosmart",
    subtitle: "Building Web3 Reality Ecosystems into Reality",
    imageUrl: "/icons/jpg/videotemp.jpg",
    previewVideoUrl: "/videos/SiUScholars.mp4",
    fullVideoUrl: "/videos/SiUScholars.mp4",
  },
  {
    title: "li:peer",
    subtitle: "The Livepeer Ecosystem",
    imageUrl: "/icons/jpg/videotemp.jpg",

    previewVideoUrl: "/videos/SiUScholars.mp4",
    fullVideoUrl: "/videos/SiUScholars.mp4",
  },
  {
    title: "CONFUSION&JOY",
    subtitle: "Bringing the Light to Darknet and Empowering Creators",
    imageUrl: "/icons/jpg/videotemp.jpg",

    previewVideoUrl: "/videos/SiUScholars.mp4",
    fullVideoUrl: "/videos/SiUScholars.mp4",
  },
  {
    title: "METIS",
    subtitle: "How to Build A Successful Team",
    imageUrl: "/icons/jpg/videotemp.jpg",

    previewVideoUrl: "/videos/SiUScholars.mp4",
    fullVideoUrl: "/videos/SiUScholars.mp4",
  },
  {
    title: "Web3 Ladies",
    subtitle: "Navigating the Web3 Developer Landscape",
    imageUrl: "/icons/jpg/videotemp.jpg",

    previewVideoUrl: "/videos/SiUScholars.mp4",
    fullVideoUrl: "/videos/SiUScholars.mp4",
  },
  {
    title: "MOJITO",
    subtitle:
      "How Brands Can Leverage Web3 to Create Deeper Connections With Their Customers",
    imageUrl: "/icons/jpg/videotemp.jpg",

    previewVideoUrl: "/videos/SiUScholars.mp4",
    fullVideoUrl: "/videos/SiUScholars.mp4",
  },
];

export function SiUScholarsWrapper() {
  return (
    <section className="pb-14 lg:pb-24">
      <HeroSection />
      <div className="py-14 lg:py-20">
        <VideoCarousel
          title="SI U"
          description="Discover leading-edge insights and education in our free and open university."
          itemsPerSlide={6}
          items={carouselItems}
        />
      </div>
      <SiHerKollab />
    </section>
  );
}
