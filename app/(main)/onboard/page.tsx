import { HeroSection } from "@/components/organisms/onboard/HeroSection";
import { PathsSection } from "@/components/organisms/onboard/PathsSection";

export default async function OnboardPage() {
  return (
    <section className="overflow-hidden">
      <HeroSection />
      <PathsSection />
    </section>
  );
}
