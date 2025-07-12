"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { Loader } from "@/components/atoms/Loader";
import { HeroDiversityTracker } from "@/components/organisms/diversityTracker/HeroSection";
import { DiversityTrackerFormSection } from "@/components/organisms/diversityTracker/DiversityTrackerFormSection";
import { DiversityTracker } from "@/types/diversity-tracker";

interface TrackerPageProps {
  trackerData?: DiversityTracker;
}

export function TrackerPage({ trackerData }: TrackerPageProps) {
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("diversityTrackerChartShown");
      if (stored === "true") {
        setShowChart(true);
      }
    }
  }, []);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (showChart) {
      queryClient.invalidateQueries({
        queryKey: ["diversityTrackerSummary"],
      });
    }
  }, [queryClient, showChart]);

  if (!trackerData) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <HeroDiversityTracker {...trackerData.banner} />
      <DiversityTrackerFormSection
        showChart={showChart}
        data={trackerData}
        setShowChart={setShowChart}
      />
    </Suspense>
  );
}