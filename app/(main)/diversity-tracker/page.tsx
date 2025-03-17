import React, { Suspense } from "react";

import { Loader } from "@/components/atoms/Loader";
import { HeroDiversityTracker } from "@/components/organisms/diversityTracker/HeroSection";
import { DiversityTrackerFormSection } from "@/components/organisms/diversityTracker/DiversityTrackerFormSection";

const DiversityTrackerPage: React.FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <HeroDiversityTracker />
      <DiversityTrackerFormSection />
    </Suspense>
  );
};

export default DiversityTrackerPage;
