import { VideoCarousel } from "@/components/molecules/carousels/videoCarousel";
import { HeroSection } from "../HeroSection";
import { Web3Brand } from "./Web3Brand";

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

const heroData = {
  title: "Si Her Guides",
  description:
    "Si Her is a global community of women & non-binary emerging tech leaders. In Si Her, we develop our professional and leadership potential as guides in the new economy.",
  subTitle: "PERSONAL BRAND. PUBLIC SPEAKING. LEADERSHIP.",
  CtaText: "Apply Now",
  CtaLink: "#",
  image: "/icons/jpg/si_her_guides_heroimage.jpg",
  memberShipFee: " *$300 one-time membership fee",
};

export function SiHerGuidesWrapper() {
  return (
    <section className="pb-2 lg:pb-14">
      <HeroSection data={heroData} />
      <div className="py-14 lg:py-20">
        <VideoCarousel
          title="SiHer.ETH Spotlight"
          description="Meet our members that are leading projects, communities, and with their hearts."
          itemsPerSlide={6}
          items={carouselItems}
        />
      </div>
      <Web3Brand />
      <div className="py-14 lg:py-20">
        <VideoCarousel
          title="Si Her Programming"
          description="Advanced emerging tech & professional development workshops focused on accelerating leadership and collaboration."
          itemsPerSlide={6}
          items={carouselItems}
        />
      </div>
      {/* <SiHerKollab /> */}
    </section>
  );
}
