import { HeroSection } from "../HeroSection";
import { Testimonials } from "@/components/molecules/carousels/Testimonials";
import { ExploreSection } from "./ExploreSection";

const heroData = {
  title: "SI<3> Partners",
  description:
    "Supporting aligned organizations in creating healthy, inclusive teams and offerings.",
  subTitle: "CAMPAIGNS. RESEARCH. TRAINING.",
  CtaText: "Inquire",
  CtaLink: "#",
  image: "/icons/jpg/partners.jpg",
};

const testimonials = [
  {
    id: "1",
    image: "/icons/jpg/testimonial.jpg",
    quote:
      "Love my decentralized website. I absolutely love my personal decentralised website (and so do event organizers!) and I wholeheartedly recommend all other womxn in the space to explore creating their own.",
    author: "Alexandra Overgaag",
    role: "Founder of Thrilld Labs",
    companyName: "Thrilld",
    companyLogo: "/icons/jpg/push.jpg",
  },
  {
    id: "2",
    image: "/icons/jpg/testimonial.jpg",

    quote:
      "The platform has transformed how we approach digital presence. It's intuitive, powerful, and exactly what we needed.",
    author: "Sarah Chen",
    role: "CEO at TechForward",
    companyName: "TechForward",
    companyLogo: "/icons/jpg/push.jpg",
  },
  {
    id: "3",
    image: "/icons/jpg/testimonial.jpg",

    quote:
      "The support and flexibility we've experienced have been outstanding. This is a game-changer for our business.",
    author: "Michael Rodriguez",
    role: "CTO of InnovateLabs",
    companyName: "InnovateLabs",
    companyLogo: "/icons/jpg/push.jpg",
  },
];

export function SiPartnersWrapper() {
  return (
    <section className="pb-2 lg:pb-14">
      <div className="px-4 lg:px-[90px]">
        <HeroSection data={heroData} />
      </div>
      <div className="px-4 py-14 lg:px-[90px] lg:py-20">
        <ExploreSection />
      </div>
      <div className="px-4 pb-10 lg:px-[90px]">
        <Testimonials items={testimonials} title="Si Her Testimonials" />
      </div>
    </section>
  );
}
