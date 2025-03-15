import { Loader } from "@/components/atoms/Loader";
import { HeroSection } from "@/components/organisms/onboard/HeroSection";
import { PathsSection } from "@/components/organisms/onboard/PathsSection";
import { getOnboardPageData } from "@/lib/sanity/client";
import { OnboardSchema } from "@/types/onboard";
import { Suspense } from "react";

export default async function OnboardPage() {
  const data: OnboardSchema = await getOnboardPageData();
  return (
    <Suspense fallback={<Loader />}>
      <section className="overflow-hidden">
        <HeroSection />
        <PathsSection data={data} />
      </section>
    </Suspense>
  );
}
