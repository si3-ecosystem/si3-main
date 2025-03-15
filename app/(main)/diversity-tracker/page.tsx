import { Loader } from "@/components/atoms/Loader";
import { DiversityTrackerFormSection } from "@/components/organisms/diversityTracker/DiversityTrackerFormSection";
import { HeroDiversityTracker } from "@/components/organisms/diversityTracker/HeroSection";
import { Suspense } from "react";

export default function DiversityTrackerPage() {
  return (
    <Suspense fallback={<Loader />}>
      <HeroDiversityTracker />
      <DiversityTrackerFormSection />
    </Suspense>
  );
}
