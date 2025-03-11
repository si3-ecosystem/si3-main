import { AnimatedHands } from "@/components/organisms/about/AnimatedHands";
import { HeroSection } from "@/components/organisms/about/HeroSection";
import { ParallaxGallery } from "@/components/organisms/about/ParallaxGallery";
import { Timeline } from "@/components/organisms/about/TimeLine";
import { TopTestimonial } from "@/components/organisms/about/TopTestimonial";

const team = [
  { id: "1", name: "John Doe", role: "Developer", image: "/about/kara.jpg" },
  {
    id: "2",
    name: "Jane Smith",
    role: "Designer",
    image: "/about/kara.jpg",
  },
];

const timelineItems = [
  {
    year: "2023",
    content:
      "The inception of SI<3>, as SI Her was born, with our 'SI Her Impact Web3' launch at NFT NYC and other eth personal brand sites.",
    isActive: true,
  },
  {
    year: "2024",
    content:
      "SI Her Summit!, FIX Finance Incubation, XX Chromosomal working group for Web3 grants, and successful partner workshops launched.",
    isActive: true,
  },
  {
    year: "2025",
    subtitle: "SPRING SUMMIT",
    content: "2nd Annual SI Her Summit, Diversity Tracker & SI V1 going live.",
    isActive: false,
  },
  {
    year: "2025",
    subtitle: "SPRING/SUMMER",
    content: "V1 B2B collaboration system and B2C app go live.",
    isActive: false,
  },
  {
    year: "2026",
    content:
      "Decentralization of the SI<3> ecosystem begins as we seek to further unify and scale.",
    isActive: false,
  },
];

export default function AboutPage() {
  return (
    <>
      <HeroSection />
      <TopTestimonial />
      <AnimatedHands />
      <ParallaxGallery teamMembers={team} />
      <Timeline items={timelineItems} />
    </>
  );
}
