"use client";

import React, { Suspense, useState, useEffect } from "react";

import { Loader } from "@/components/atoms/Loader";
import { HeroDiversityTracker } from "@/components/organisms/diversityTracker/HeroSection";
import { DiversityTrackerFormSection } from "@/components/organisms/diversityTracker/DiversityTrackerFormSection";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getDiversityTrackerData } from "@/lib/sanity/client";
import { DiversityTracker } from "@/types/diversity-tracker";

const Web3HealthTrackerPage: React.FC = () => {
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

  const { data, isLoading } = useQuery<DiversityTracker>({
    queryKey: ["getDiversityTracker"],
    queryFn: getDiversityTrackerData,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (showChart) {
      queryClient.invalidateQueries({
        queryKey: ["diversityTrackerSummary"],
      });
    }
  }, [queryClient, showChart]);

  if (isLoading) return <Loader />;

  return (
    <Suspense fallback={<Loader />}>
      <HeroDiversityTracker {...data?.banner} />
      <DiversityTrackerFormSection
        showChart={showChart}
        data={data}
        setShowChart={setShowChart}
      />
    </Suspense>
  );
};

export default Web3HealthTrackerPage;
